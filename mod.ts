import {
  Router,
  Application,
} from "./deps.ts";

import {
  responseTimeHeader,
} from "./_responseTimeHeader.ts";

import {
  rawBodyState,
  verifySlackHeader,
  verifyAPI,
} from "./_middleware.ts";

const router = new Router();
router
  .post("/", rawBodyState, verifySlackHeader, verifyAPI, (context, next) => {
    const jsonBody = JSON.parse(context.state.body);
    context.response.body = jsonBody.challenge;
  });

const app = new Application();
app.use(responseTimeHeader);
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
