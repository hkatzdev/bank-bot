import {
  Router,
  Application,
} from "./deps.ts";

import {
  responseTimeHeader,
} from "./_responseTimeHeader.ts";

const router = new Router();
router
  .get("/", (context, next) => {
    context.response.body = "Hello world!";
  });

const app = new Application();
app.use(responseTimeHeader);
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
