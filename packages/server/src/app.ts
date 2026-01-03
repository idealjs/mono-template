import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type {
  Http2SecureServer,
  Http2ServerRequest,
  Http2ServerResponse,
} from "node:http2";
import type { FastifyInstance } from "fastify";

import http from "./http";
import http2 from "./http2";
import routes from "./routes";

const app = (
  process.env.HTTP2 === "true" ? http2() : http()
) as FastifyInstance<
  Http2SecureServer | Server,
  IncomingMessage | Http2ServerRequest,
  ServerResponse | Http2ServerResponse
>;

app.register(routes);

export default app;

export { app as viteNodeApp };
