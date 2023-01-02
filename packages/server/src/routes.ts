import { moduleA } from "@idealjs/mono-template";
import Router from "@koa/router";

const router = new Router();

router.get("/health", (ctx, next) => {
  ctx.body = { alive: true };
  console.log("[test] moduleA", moduleA);
  next();
});

export default router;
