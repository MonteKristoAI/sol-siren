import { cookies } from "next/headers";
import { checkPassword, createSession, COOKIE_NAME } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }
  if (!body.password || !checkPassword(body.password)) {
    // small constant delay to blunt brute force feel
    await new Promise((r) => setTimeout(r, 400));
    return Response.json({ error: "Wrong password" }, { status: 401 });
  }
  const { value, maxAge } = await createSession();
  cookies().set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  return Response.json({ ok: true });
}
