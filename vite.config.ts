import { defineConfig, loadEnv, type Connect } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const RETELL_BASE = "https://api.retellai.com";

function readJsonBody(req: Connect.IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve({});
      try { resolve(JSON.parse(raw)); } catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}

function send(res: import("http").ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function chatProxy(env: Record<string, string>) {
  const apiKey = env.RETELL_API_KEY;
  const agentId = env.RETELL_AGENT_ID;

  async function callRetell(path: string, body: unknown) {
    const r = await fetch(RETELL_BASE + path, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const text = await r.text();
    let data: unknown;
    try { data = JSON.parse(text); } catch { data = text; }
    return { status: r.status, data };
  }

  return {
    name: "sol-siren-chat-proxy",
    configureServer(server: import("vite").ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();
        if (req.method !== "POST") return next();

        if (req.url === "/api/chat/start") {
          if (!apiKey || !agentId) return send(res, 500, { error: "RETELL_API_KEY or RETELL_AGENT_ID missing in .env.local" });
          try {
            const upstream = await callRetell("/create-chat", { agent_id: agentId });
            return send(res, upstream.status, upstream.data);
          } catch (e) {
            return send(res, 502, { error: String(e) });
          }
        }

        if (req.url === "/api/chat/message") {
          if (!apiKey) return send(res, 500, { error: "RETELL_API_KEY missing" });
          try {
            const body = (await readJsonBody(req)) as { chat_id?: string; content?: string };
            if (!body.chat_id || !body.content) return send(res, 400, { error: "chat_id and content required" });
            const upstream = await callRetell("/create-chat-completion", {
              chat_id: body.chat_id,
              content: body.content,
            });
            return send(res, upstream.status, upstream.data);
          } catch (e) {
            return send(res, 502, { error: String(e) });
          }
        }

        return next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      host: "::",
      port: 8080,
      hmr: { overlay: false },
    },
    plugins: [
      react(),
      chatProxy(env),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
  };
});
