const http = require("http");
const fs = require("fs");
const path = require("path");

const DEFAULT_PORT = 8080;
const PORT_CANDIDATES = Array.from({ length: 50 }, (_, index) => 8080 + index);
const PORT = Number(process.env.PORT || DEFAULT_PORT);
const ROOT_DIR = path.join(__dirname, "../..");

const BLOCKLIST = [
  "openai.com",
  "chat.openai.com",
  "api.openai.com",
  "platform.openai.com",
  "anthropic.com",
  "claude.ai",
  "api.anthropic.com",
  "gemini.google.com",
  "generativelanguage.googleapis.com",
  "copilot.microsoft.com",
  "api.githubcopilot.com",
  "cursor.com",
  "cursor.sh",
  "cursorapi.com",
  "perplexity.ai",
  "api.perplexity.ai",
  "chatgpt.com",
  "cohere.ai",
  "api.cohere.ai",
  "cline.api",
  "api.cursor.sh",
];

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpg",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

function isBlockedRequest(req) {
  const target =
    `${req.url || ""}\n${req.headers.referer || ""}\n${req.headers.host || ""}`.toLowerCase();

  return BLOCKLIST.some((entry) => target.includes(entry.toLowerCase()));
}

function safeResolve(filePath) {
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(ROOT_DIR))) {
    return null;
  }
  return resolved;
}

function startServer(port, candidateIndex = 0) {
  const server = http.createServer((req, res) => {
    if (isBlockedRequest(req)) {
      console.log(
        `\x1b[31m[GUARD] Requisição externa bloqueada: ${req.url}\x1b[0m`,
      );
      res.writeHead(403, {
        "Content-Type": "text/plain",
        "X-Content-Type-Options": "nosniff",
      });
      res.end("Acesso restrito por política local do ambiente.");
      return;
    }

    const normalizedUrl = req.url === "/" ? "/index.html" : req.url;
    const filePath = safeResolve(path.join(ROOT_DIR, normalizedUrl));

    if (!filePath) {
      res.writeHead(403, { "Content-Type": "text/plain" });
      res.end("Acesso proibido.");
      return;
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || "application/octet-stream";

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === "ENOENT") {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("<h1>404 Not Found</h1>", "utf-8");
          return;
        }

        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(`Erro interno: ${error.code}`);
        return;
      }

      res.writeHead(200, {
        "Content-Type": contentType,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-store",
      });
      res.end(content, "utf-8");
    });
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      if (!process.env.PORT) {
        const nextPort = PORT_CANDIDATES[candidateIndex + 1];
        if (nextPort) {
          console.warn(
            `\x1b[33m[LOCAL GUARD]\x1b[0m Porta ${port} ocupada. Tentando ${nextPort}...`,
          );
          startServer(nextPort, candidateIndex + 1);
          return;
        }
      }

      throw error;
    }

    throw error;
  });

  server.listen(port, () => {
    console.log(
      `\n\x1b[32m[LOCAL GUARD]\x1b[0m Rodando em http://localhost:${port}`,
    );
    console.log("\x1b[33m[STATUS]\x1b[0m Ambiente local com proteção ativa.\n");
  });
}

const initialPort = Number.isFinite(PORT) && PORT > 0 ? PORT : DEFAULT_PORT;
startServer(initialPort, PORT_CANDIDATES.indexOf(initialPort));
