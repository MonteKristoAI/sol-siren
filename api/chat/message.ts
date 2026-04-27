export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "RETELL_API_KEY missing in env" }, { status: 500 });
  }

  let body: { chat_id?: string; content?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.chat_id || !body.content) {
    return Response.json(
      { error: "chat_id and content required" },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch("https://api.retellai.com/create-chat-completion", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: body.chat_id,
        content: body.content,
      }),
    });
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "upstream error" },
      { status: 502 }
    );
  }
}
