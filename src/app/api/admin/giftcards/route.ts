import { listGiftCards, createGiftCard } from "@/lib/admin/shopify-extra";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json({ giftCards: await listGiftCards() });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
}

// POST { amount, expiresInDays?, note? } -> creates a gift card, returns the code once.
export async function POST(req: Request) {
  let b: { amount?: number; expiresInDays?: number | null; note?: string };
  try {
    b = await req.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }
  const amount = Number(b.amount);
  if (!amount || amount <= 0) return Response.json({ error: "amount must be greater than 0" }, { status: 400 });
  try {
    const gc = await createGiftCard(amount, b.expiresInDays ?? null, b.note);
    return Response.json({ ok: true, giftCard: gc });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
}
