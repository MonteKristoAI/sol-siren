import { listInquiries, setInquiryStatus, STATUSES } from "@/lib/admin/inbox";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json({ inquiries: await listInquiries(100) });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
}

// PATCH { id, status }
export async function PATCH(req: Request) {
  let b: { id?: string; status?: string };
  try {
    b = await req.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }
  if (!b.id || !b.status || !STATUSES.includes(b.status as any)) {
    return Response.json({ error: "id and valid status required" }, { status: 400 });
  }
  try {
    await setInquiryStatus(b.id, b.status);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
}
