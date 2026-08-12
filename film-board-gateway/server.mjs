/**
 * Reverse-proxy /training* → film-board droplet.
 * Keeps SQLite + uploads on the droplet; App Platform only routes the path.
 */
import http from "node:http";
import { request as httpRequest } from "node:http";

const PORT = Number(process.env.PORT || 8080);
const UPSTREAM = String(process.env.FILM_BOARD_UPSTREAM || "http://167.99.81.152:8770").replace(/\/+$/, "");

function upstreamUrl(pathWithQuery) {
  return new URL(pathWithQuery || "/", UPSTREAM + "/");
}

const HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
]);

function filterHeaders(src) {
  const out = {};
  for (const [k, v] of Object.entries(src || {})) {
    if (HOP.has(k.toLowerCase())) continue;
    out[k] = v;
  }
  return out;
}

const server = http.createServer((req, res) => {
  if ((req.url || "").split("?")[0] === "/gateway-health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, upstream: UPSTREAM }));
    return;
  }

  let target;
  try {
    target = upstreamUrl(req.url || "/");
  } catch (e) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("bad upstream");
    return;
  }

  const headers = filterHeaders(req.headers);
  headers.host = target.host;
  const xfHost = req.headers["x-forwarded-host"] || req.headers.host;
  const xfProto = req.headers["x-forwarded-proto"] || "https";
  headers["x-forwarded-host"] = xfHost;
  headers["x-forwarded-proto"] = String(xfProto).split(",")[0].trim();
  headers["x-forwarded-for"] = [req.headers["x-forwarded-for"], req.socket.remoteAddress]
    .filter(Boolean)
    .join(", ");

  const preq = httpRequest(
    {
      protocol: target.protocol,
      hostname: target.hostname,
      port: target.port || (target.protocol === "https:" ? 443 : 80),
      path: target.pathname + target.search,
      method: req.method,
      headers,
      timeout: 0,
    },
    (pres) => {
      const outHeaders = filterHeaders(pres.headers);
      res.writeHead(pres.statusCode || 502, outHeaders);
      pres.pipe(res);
    }
  );

  preq.on("timeout", () => {
    preq.destroy();
  });
  preq.on("error", (err) => {
    if (!res.headersSent) {
      res.writeHead(502, { "Content-Type": "text/plain" });
      res.end(`Bad gateway: ${err.message}`);
    } else {
      res.destroy();
    }
  });

  req.pipe(preq);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`film-board-gateway :${PORT} → ${UPSTREAM}`);
});
