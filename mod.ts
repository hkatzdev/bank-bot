import {
  Application,
} from "./deps.ts";

import {
  router,
} from "./_router.ts";

import {
  responseTimeHeader,
} from "./_responseTimeHeader.ts";

const app = new Application();
app.use(responseTimeHeader);
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
