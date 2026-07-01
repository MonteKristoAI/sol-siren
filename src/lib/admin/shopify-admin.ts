// Shopify Admin API client for the Sol Siren admin portal.
// Mints a short-lived token via the custom app's client_credentials grant
// and caches it in module memory until it nears expiry. Server-only.

const STORE =
  process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID || "";
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET || "";
const API_VERSION = process.env.SHOPIFY_API_VERSION || "2024-10";

let cached: { token: string; expiresAt: number } | null = null;

async function getToken(): Promise<string> {
  const now = Date.now();
  if (cached && cached.expiresAt - 60_000 > now) return cached.token;
  if (!STORE || !CLIENT_ID || !CLIENT_SECRET) {
    throw new Error("Shopify Admin env not configured (SHOPIFY_STORE_DOMAIN / CLIENT_ID / CLIENT_SECRET)");
  }
  const res = await fetch(`https://${STORE}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "client_credentials",
    }),
  });
  if (!res.ok) throw new Error(`Shopify token mint ${res.status}: ${await res.text()}`);
  const j = (await res.json()) as { access_token: string; expires_in: number };
  cached = { token: j.access_token, expiresAt: now + (j.expires_in || 86399) * 1000 };
  return cached.token;
}

export async function adminGraphql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const token = await getToken();
  const res = await fetch(`https://${STORE}/admin/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": token },
    cache: "no-store",
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify Admin ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.errors) throw new Error(`Shopify GraphQL: ${JSON.stringify(json.errors)}`);
  return json.data as T;
}

export type AdminProduct = {
  id: string;
  handle: string;
  title: string;
  status: "ACTIVE" | "ARCHIVED" | "DRAFT";
  productType: string;
  vendor: string;
  tags: string[];
  totalInventory: number;
  createdAt: string;
  description: string;
  descriptionHtml: string;
  featuredImage: string | null;
  price: number | null;
  currency: string;
  variantId: string | null;
  onlineStoreUrl: string | null;
};

const PRODUCT_FIELDS = `
  id handle title status productType vendor tags totalInventory createdAt
  description descriptionHtml onlineStoreUrl
  featuredImage { url }
  variants(first: 1) { edges { node { id price } } }
  priceRangeV2 { minVariantPrice { amount currencyCode } }
`;

function flatten(n: any): AdminProduct {
  const v = n.variants?.edges?.[0]?.node;
  return {
    id: n.id,
    handle: n.handle,
    title: n.title,
    status: n.status,
    productType: n.productType || "",
    vendor: n.vendor || "",
    tags: n.tags || [],
    totalInventory: n.totalInventory ?? 0,
    createdAt: n.createdAt,
    description: n.description || "",
    descriptionHtml: n.descriptionHtml || "",
    featuredImage: n.featuredImage?.url || null,
    price: v?.price ? parseFloat(v.price) : n.priceRangeV2?.minVariantPrice?.amount ? parseFloat(n.priceRangeV2.minVariantPrice.amount) : null,
    currency: n.priceRangeV2?.minVariantPrice?.currencyCode || "USD",
    variantId: v?.id || null,
    onlineStoreUrl: n.onlineStoreUrl || null,
  };
}

export async function listProducts(): Promise<AdminProduct[]> {
  const out: AdminProduct[] = [];
  let cursor: string | null = null;
  // up to 5 pages of 100 = 500 products, plenty for a one-curator shop
  for (let i = 0; i < 5; i++) {
    const data: any = await adminGraphql(
      `query($cursor: String) {
        products(first: 100, after: $cursor, sortKey: CREATED_AT, reverse: true) {
          edges { node { ${PRODUCT_FIELDS} } }
          pageInfo { hasNextPage endCursor }
        }
      }`,
      { cursor }
    );
    out.push(...data.products.edges.map((e: any) => flatten(e.node)));
    if (!data.products.pageInfo.hasNextPage) break;
    cursor = data.products.pageInfo.endCursor;
  }
  return out;
}

export async function getProduct(id: string): Promise<AdminProduct | null> {
  const data: any = await adminGraphql(`query($id: ID!){ product(id:$id){ ${PRODUCT_FIELDS} } }`, { id });
  return data.product ? flatten(data.product) : null;
}

async function userErrors(data: any, key: string) {
  const errs = data?.[key]?.userErrors;
  if (errs && errs.length) throw new Error(errs.map((e: any) => e.message).join("; "));
}

export async function setStatus(id: string, status: "ACTIVE" | "ARCHIVED" | "DRAFT") {
  const data: any = await adminGraphql(
    `mutation($input: ProductInput!){ productUpdate(input:$input){ product{ id status } userErrors{ field message } } }`,
    { input: { id, status } }
  );
  await userErrors(data, "productUpdate");
  return data.productUpdate.product;
}

export async function addTags(id: string, tags: string[]) {
  const data: any = await adminGraphql(
    `mutation($id: ID!, $tags: [String!]!){ tagsAdd(id:$id, tags:$tags){ userErrors{ message } } }`,
    { id, tags }
  );
  await userErrors(data, "tagsAdd");
}

export async function removeTags(id: string, tags: string[]) {
  const data: any = await adminGraphql(
    `mutation($id: ID!, $tags: [String!]!){ tagsRemove(id:$id, tags:$tags){ userErrors{ message } } }`,
    { id, tags }
  );
  await userErrors(data, "tagsRemove");
}

export async function updateDetails(
  id: string,
  fields: { title?: string; descriptionHtml?: string; productType?: string; tags?: string[] }
) {
  const data: any = await adminGraphql(
    `mutation($input: ProductInput!){ productUpdate(input:$input){ product{ id } userErrors{ field message } } }`,
    { input: { id, ...fields } }
  );
  await userErrors(data, "productUpdate");
}

export async function setPrice(productId: string, variantId: string, price: number) {
  const data: any = await adminGraphql(
    `mutation($pid: ID!, $variants: [ProductVariantsBulkInput!]!){
      productVariantsBulkUpdate(productId:$pid, variants:$variants){ userErrors{ field message } }
    }`,
    { pid: productId, variants: [{ id: variantId, price: price.toFixed(2) }] }
  );
  await userErrors(data, "productVariantsBulkUpdate");
}

// Create a one-of-one piece as a DRAFT so Erin reviews before it goes live.
export async function createDraftProduct(input: {
  title: string;
  descriptionHtml?: string;
  productType?: string;
  tags?: string[];
  price?: number;
  imageUrls?: string[];
}) {
  const media = (input.imageUrls || []).filter(Boolean).map((u) => ({
    originalSource: u,
    mediaContentType: "IMAGE",
  }));
  const data: any = await adminGraphql(
    `mutation($input: ProductInput!, $media: [CreateMediaInput!]){
      productCreate(input:$input, media:$media){ product{ id handle } userErrors{ field message } }
    }`,
    {
      input: {
        title: input.title,
        descriptionHtml: input.descriptionHtml || "",
        productType: input.productType || "",
        tags: input.tags || [],
        status: "DRAFT",
      },
      media,
    }
  );
  await userErrors(data, "productCreate");
  const product = data.productCreate.product;
  if (input.price != null && product?.id) {
    // set price on the auto-created default variant
    const pd: any = await adminGraphql(
      `query($id: ID!){ product(id:$id){ variants(first:1){ edges{ node{ id } } } } }`,
      { id: product.id }
    );
    const vid = pd.product?.variants?.edges?.[0]?.node?.id;
    if (vid) await setPrice(product.id, vid, input.price);
  }
  return product;
}

export type ShipTo = {
  name: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone: string;
};

export type AdminOrder = {
  id: string;
  name: string;
  createdAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  total: number;
  currency: string;
  customer: string;
  email: string;
  country: string | null;
  ship: ShipTo | null;
  items: string[];
};

export async function listOrders(first = 25): Promise<AdminOrder[]> {
  const data: any = await adminGraphql(
    `query($first: Int!){
      orders(first:$first, sortKey: CREATED_AT, reverse:true){
        edges{ node{
          id name createdAt displayFinancialStatus displayFulfillmentStatus email
          totalPriceSet{ shopMoney{ amount currencyCode } }
          customer{ displayName email }
          shippingAddress{ name address1 address2 city province provinceCode zip country phone }
          lineItems(first:10){ edges{ node{ title } } }
        } }
      }
    }`,
    { first }
  );
  return (data.orders?.edges || []).map((e: any) => {
    const n = e.node;
    const a = n.shippingAddress;
    return {
      id: n.id,
      name: n.name,
      createdAt: n.createdAt,
      financialStatus: n.displayFinancialStatus || "",
      fulfillmentStatus: n.displayFulfillmentStatus || "",
      total: parseFloat(n.totalPriceSet?.shopMoney?.amount || "0"),
      currency: n.totalPriceSet?.shopMoney?.currencyCode || "USD",
      customer: n.customer?.displayName || "Guest",
      email: n.email || n.customer?.email || "",
      country: a?.country || null,
      ship: a
        ? {
            name: a.name || "",
            address1: a.address1 || "",
            address2: a.address2 || "",
            city: a.city || "",
            province: a.province || a.provinceCode || "",
            zip: a.zip || "",
            country: a.country || "",
            phone: a.phone || "",
          }
        : null,
      items: (n.lineItems?.edges || []).map((le: any) => le.node.title),
    } as AdminOrder;
  });
}
