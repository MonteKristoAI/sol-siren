import { listChats } from "@/lib/admin/retell-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json({ chats: await listChats(50) });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
}
