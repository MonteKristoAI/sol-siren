// Extra Shopify Admin helpers for the v2 admin: archive lifecycle, metafields
// (used for per-piece history-card status, care notes, and per-order packing
// checklists — no separate database needed), collections and gift cards.
import { adminGraphql, addTags, removeTags, setStatus } from "@/lib/admin/shopify-admin";

export const MF_NAMESPACE = "ss_admin";

// ---- Archive lifecycle -----------------------------------------------------
// Archived pieces stay ACTIVE in Shopify (so the Storefront API still returns
// them and they can show in the site's brand archive) but carry tags that the
// storefront uses to move them out of the main shop and into /archive.

export async function moveToArchive(id: string) {
  await setStatus(id, "ACTIVE");
  await addTags(id, ["sold", "archive"]);
}

export async function restoreToLive(id: string) {
  await removeTags(id, ["sold", "archive", "price-hidden"]);
  await setStatus(id, "ACTIVE");
}

export async function setPriceHidden(id: string, hidden: boolean) {
  if (hidden) await addTags(id, ["price-hidden"]);
  else await removeTags(id, ["price-hidden"]);
}

// ---- Metafields ------------------------------------------------------------

export async function setMetafield(
  ownerId: string,
  key: string,
  value: string,
  type: "json" | "single_line_text_field" | "multi_line_text_field" = "json"
) {
  const data: any = await adminGraphql(
    `mutation($mf: [MetafieldsSetInput!]!){
      metafieldsSet(metafields: $mf){ userErrors{ field message } }
    }`,
    { mf: [{ ownerId, namespace: MF_NAMESPACE, key, type, value }] }
  );
  const errs = data?.metafieldsSet?.userErrors;
  if (errs && errs.length) throw new Error(errs.map((e: any) => e.message).join("; "));
}

export async function getMetafield(ownerId: string, key: string): Promise<string | null> {
  const data: any = await adminGraphql(
    `query($id: ID!, $ns: String!, $key: String!){
      node(id: $id){ ... on Product { metafield(namespace:$ns, key:$key){ value } }
                     ... on Order   { metafield(namespace:$ns, key:$key){ value } } }
    }`,
    { id: ownerId, ns: MF_NAMESPACE, key }
  );
  return data?.node?.metafield?.value ?? null;
}

// All ss_admin metafields for a set of products, in one query (batched by 50).
export async function getProductsMeta(
  ids: string[]
): Promise<Record<string, Record<string, string>>> {
  const out: Record<string, Record<string, string>> = {};
  for (let i = 0; i < ids.length; i += 50) {
    const batch = ids.slice(i, i + 50);
    const data: any = await adminGraphql(
      `query($ids: [ID!]!, $ns: String!){
        nodes(ids: $ids){ ... on Product { id metafields(first: 20, namespace:$ns){ edges{ node{ key value } } } } }
      }`,
      { ids: batch, ns: MF_NAMESPACE }
    );
    for (const n of data.nodes || []) {
      if (!n) continue;
      out[n.id] = {};
      for (const e of n.metafields?.edges || []) out[n.id][e.node.key] = e.node.value;
    }
  }
  return out;
}

// ---- Collections -----------------------------------------------------------

export type AdminCollection = {
  id: string;
  title: string;
  handle: string;
  productsCount: number;
  updatedAt: string;
};

export async function listCollections(): Promise<AdminCollection[]> {
  const data: any = await adminGraphql(
    `query{ collections(first: 100, sortKey: TITLE){ edges{ node{
      id title handle updatedAt productsCount{ count }
    } } } }`
  );
  return (data.collections?.edges || []).map((e: any) => ({
    id: e.node.id,
    title: e.node.title,
    handle: e.node.handle,
    productsCount: e.node.productsCount?.count ?? 0,
    updatedAt: e.node.updatedAt,
  }));
}

// ---- Gift cards ------------------------------------------------------------

export type AdminGiftCard = {
  id: string;
  maskedCode: string;
  balance: number;
  currency: string;
  enabled: boolean;
  createdAt: string;
};

export async function listGiftCards(): Promise<AdminGiftCard[]> {
  const data: any = await adminGraphql(
    `query{ giftCards(first: 50, sortKey: CREATED_AT, reverse: true){ edges{ node{
      id lastCharacters enabled createdAt
      balance{ amount currencyCode }
    } } } }`
  ).catch(() => ({ giftCards: { edges: [] } }));
  return (data.giftCards?.edges || []).map((e: any) => ({
    id: e.node.id,
    maskedCode: `••••${e.node.lastCharacters || ""}`,
    balance: parseFloat(e.node.balance?.amount || "0"),
    currency: e.node.balance?.currencyCode || "USD",
    enabled: !!e.node.enabled,
    createdAt: e.node.createdAt,
  }));
}
