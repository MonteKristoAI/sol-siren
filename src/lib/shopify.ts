const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const API_VERSION = "2024-10";

const ENDPOINT = `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

export type Money = { amount: string; currencyCode: string };

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  selectedOptions: { name: string; value: string }[];
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  vendor: string;
  availableForSale: boolean;
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  options: { id: string; name: string; values: string[] }[];
};

export type CartLine = {
  id: string;
  quantity: number;
  cost: { totalAmount: Money };
  merchandise: {
    id: string;
    title: string;
    image: ShopifyImage | null;
    product: { handle: string; title: string };
    selectedOptions: { name: string; value: string }[];
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
  lines: CartLine[];
};

async function shopifyFetch<T>({
  query,
  variables,
  cache = "no-store",
}: {
  query: string;
  variables?: Record<string, any>;
  cache?: RequestCache;
}): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache,
  });

  if (!res.ok) {
    throw new Error(`Shopify API ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  if (json.errors) {
    throw new Error(`Shopify GraphQL: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

const PRODUCT_FRAGMENT = `
  id
  handle
  title
  description
  descriptionHtml
  productType
  tags
  vendor
  availableForSale
  priceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
  featuredImage { url altText width height }
  images(first: 20) { edges { node { url altText width height } } }
  options { id name values }
  variants(first: 50) {
    edges {
      node {
        id
        title
        availableForSale
        price { amount currencyCode }
        selectedOptions { name value }
      }
    }
  }
`;

function flattenProduct(p: any): ShopifyProduct {
  return {
    ...p,
    images: p.images.edges.map((e: any) => e.node),
    variants: p.variants.edges.map((e: any) => e.node),
  };
}

export async function getAllProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ products: { edges: { node: any }[] } }>({
    query: `query { products(first: 100) { edges { node { ${PRODUCT_FRAGMENT} } } } }`,
    cache: "force-cache",
  });
  return data.products.edges.map((e) => flattenProduct(e.node));
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: any | null }>({
    query: `query Product($handle: String!) { product(handle: $handle) { ${PRODUCT_FRAGMENT} } }`,
    variables: { handle },
    cache: "force-cache",
  });
  return data.product ? flattenProduct(data.product) : null;
}

const CART_FRAGMENT = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
    totalTaxAmount { amount currencyCode }
  }
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        cost { totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            image { url altText width height }
            product { handle title }
            selectedOptions { name value }
          }
        }
      }
    }
  }
`;

function flattenCart(c: any): Cart {
  return { ...c, lines: c.lines.edges.map((e: any) => e.node) };
}

export async function createCart(lines: { merchandiseId: string; quantity: number }[] = []): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: any } }>({
    query: `mutation CartCreate($input: CartInput!) { cartCreate(input: $input) { cart { ${CART_FRAGMENT} } } }`,
    variables: { input: { lines } },
  });
  return flattenCart(data.cartCreate.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: any | null }>({
    query: `query Cart($id: ID!) { cart(id: $id) { ${CART_FRAGMENT} } }`,
    variables: { id: cartId },
  });
  return data.cart ? flattenCart(data.cart) : null;
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: any } }>({
    query: `mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FRAGMENT} } }
    }`,
    variables: { cartId, lines },
  });
  return flattenCart(data.cartLinesAdd.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: any } }>({
    query: `mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FRAGMENT} } }
    }`,
    variables: { cartId, lineIds },
  });
  return flattenCart(data.cartLinesRemove.cart);
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: any } }>({
    query: `mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FRAGMENT} } }
    }`,
    variables: { cartId, lines: [{ id: lineId, quantity }] },
  });
  return flattenCart(data.cartLinesUpdate.cart);
}

// Map Shopify productType to our internal category slug
export function mapCategory(productType: string): string {
  const map: Record<string, string> = {
    "Fur": "fur",
    "Leather": "leather",
    "Penny Lane / Afghan": "penny-lane-afghan",
    "Penny Lane Coat": "penny-lane-afghan",
    "Overcoat": "overcoat",
    "Apres Ski": "apres-ski",
    "Jewelry": "jewelry",
  };
  return map[productType] || productType.toLowerCase().replace(/\s+/g, "-");
}

// Adapter — convert Shopify product to UI-friendly shape compatible with our existing components
export type UIProduct = {
  id: string;
  variantId: string;
  name: string;
  variant: string;
  price: number;
  image: string;
  images: string[];
  slug: string;
  category: string;
  sold: boolean;
  description: string;
  descriptionHtml: string;
  sizes: string[];
};

export function toUIProduct(s: ShopifyProduct): UIProduct {
  const firstVariant = s.variants[0];
  // Get unique size options across variants
  const sizes = Array.from(
    new Set(
      s.variants.flatMap((v) =>
        v.selectedOptions.filter((o) => /size/i.test(o.name)).map((o) => o.value)
      )
    )
  );
  return {
    id: s.id,
    variantId: firstVariant?.id || "",
    name: s.title.toUpperCase().split(" — ")[0].split(" - ")[0].trim(),
    variant: s.title,
    price: parseFloat(s.priceRange.minVariantPrice.amount),
    image: s.featuredImage?.url || s.images[0]?.url || "",
    images: s.images.map((i) => i.url),
    slug: s.handle,
    category: mapCategory(s.productType),
    sold: !s.availableForSale,
    description: s.description,
    descriptionHtml: s.descriptionHtml,
    sizes,
  };
}
