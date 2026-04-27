export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const apiKey = process.env.RETELL_API_KEY;
  const agentId = process.env.RETELL_AGENT_ID;
  if (!apiKey || !agentId) {
    return Response.json(
      { error: "RETELL_API_KEY or RETELL_AGENT_ID missing in env" },
      { status: 500 }
    );
  }

  try {
    const upstream = await fetch("https://api.retellai.com/create-chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agent_id: agentId }),
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
