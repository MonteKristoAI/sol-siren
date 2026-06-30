import { createInquiry } from "@/lib/admin/inbox";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// PUBLIC endpoint — the site contact form posts here. Stored as a Shopify
// metaobject and surfaced in the admin Inbox.
export async function POST(req: Request) {
  let b: { name?: string; email?: string; subject?: string; message?: string; type?: string; product?: string; company?: string };
  try {
    b = await req.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }
  // honeypot — bots fill hidden "company" field
  if (b.company) return Response.json({ ok: true });

  const name = (b.name || "").trim();
  const email = (b.email || "").trim();
  const message = (b.message || "").trim();
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 2) {
    return Response.json({ error: "Please fill in your name, a valid email, and a message." }, { status: 400 });
  }
  try {
    await createInquiry({
      name,
      email,
      subject: b.subject,
      message,
      inquiryType: b.type,
      relatedProduct: b.product,
    });
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Could not send" }, { status: 502 });
  }
}
