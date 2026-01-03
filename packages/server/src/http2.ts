import fs from "node:fs";
import path from "node:path";
import Fastify from "fastify";

const createServer = () => {
  const options = {
    key: fs.readFileSync(path.resolve(__dirname, "../server.key")),
    cert: fs.readFileSync(path.resolve(__dirname, "../server.crt")),
  };
  const fastify = Fastify({
    http2: true,
    https: options,
  });

  return fastify;
};

export default createServer;
