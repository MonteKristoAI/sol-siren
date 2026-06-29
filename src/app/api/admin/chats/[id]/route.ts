import { getChat } from "@/lib/admin/retell-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    return Response.json({ chat: await getChat(params.id) });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
}
