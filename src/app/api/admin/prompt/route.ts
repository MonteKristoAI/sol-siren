import { getPrompt, updatePrompt } from "@/lib/admin/retell-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json(await getPrompt());
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
}

export async function PUT(req: Request) {
  let b: { prompt?: string };
  try {
    b = await req.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }
  if (typeof b.prompt !== "string" || b.prompt.trim().length < 20) {
    return Response.json({ error: "prompt too short" }, { status: 400 });
  }
  try {
    await updatePrompt(b.prompt);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
}
