// Contact inbox backed by Shopify metaobjects (type "ss_inquiry") — no separate
// database. The metaobject definition is already created on the store.
import { adminGraphql } from "@/lib/admin/shopify-admin";

export const INQUIRY_TYPE = "ss_inquiry";
export const STATUSES = ["New", "Replied", "Waiting", "Closed"] as const;
export const TYPES = ["Order", "Sizing", "Shipping", "Collaboration", "Similar Piece", "General"] as const;

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: string;
  status: string;
  relatedProduct: string;
  createdAt: string;
};

function fieldsToObj(fields: { key: string; value: string }[]): Record<string, string> {
  const o: Record<string, string> = {};
  for (const f of fields || []) o[f.key] = f.value;
  return o;
}

function toInquiry(node: any): Inquiry {
  const f = fieldsToObj(node.fields);
  return {
    id: node.id,
    name: f.name || "",
    email: f.email || "",
    subject: f.subject || "",
    message: f.message || "",
    inquiryType: f.inquiry_type || "General",
    status: f.status || "New",
    relatedProduct: f.related_product || "",
    createdAt: f.created_at || "",
  };
}

export async function createInquiry(input: {
  name: string;
  email: string;
  subject?: string;
  message: string;
  inquiryType?: string;
  relatedProduct?: string;
}): Promise<void> {
  const fields = [
    { key: "name", value: input.name.slice(0, 200) },
    { key: "email", value: input.email.slice(0, 200) },
    { key: "subject", value: (input.subject || "").slice(0, 300) },
    { key: "message", value: input.message.slice(0, 5000) },
    { key: "inquiry_type", value: input.inquiryType || "General" },
    { key: "status", value: "New" },
    { key: "related_product", value: input.relatedProduct || "" },
    { key: "created_at", value: new Date().toISOString() },
  ];
  const data: any = await adminGraphql(
    `mutation($m: MetaobjectCreateInput!){ metaobjectCreate(metaobject:$m){ metaobject{ id } userErrors{ field message } } }`,
    { m: { type: INQUIRY_TYPE, fields } }
  );
  const errs = data?.metaobjectCreate?.userErrors;
  if (errs && errs.length) throw new Error(errs.map((e: any) => e.message).join("; "));
}

export async function listInquiries(limit = 100): Promise<Inquiry[]> {
  const data: any = await adminGraphql(
    `query($n: Int!){ metaobjects(type:"${INQUIRY_TYPE}", first:$n, sortKey:"updated_at", reverse:true){
      edges{ node{ id fields{ key value } } }
    } }`,
    { n: limit }
  ).catch(() => ({ metaobjects: { edges: [] } }));
  return (data.metaobjects?.edges || [])
    .map((e: any) => toInquiry(e.node))
    .sort((a: Inquiry, b: Inquiry) => (b.createdAt || "").localeCompare(a.createdAt || ""));
}

export async function setInquiryStatus(id: string, status: string): Promise<void> {
  const data: any = await adminGraphql(
    `mutation($id: ID!, $fields: [MetaobjectFieldInput!]!){
      metaobjectUpdate(id:$id, metaobject:{ fields:$fields }){ metaobject{ id } userErrors{ field message } }
    }`,
    { id, fields: [{ key: "status", value: status }] }
  );
  const errs = data?.metaobjectUpdate?.userErrors;
  if (errs && errs.length) throw new Error(errs.map((e: any) => e.message).join("; "));
}

export async function countNewInquiries(): Promise<number> {
  const all = await listInquiries(100).catch(() => []);
  return all.filter((i) => i.status === "New").length;
}
