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
  .get(
    "/",
    async (context, _) =>
      context.response.redirect(
        "https://github.com/hkatzdev/bank-bot/tree/prohacks",
      ),
  )
  .get("/ping", async (context, _) => context.response.body = "pong!")
  .post(
    "/events",
    rawBodyState,
    verifySlackHeader,
    verifyAPI,
    async (context, _) => {
      const jsonBody = JSON.parse(context.state.body);
      context.response.body = jsonBody.challenge;
    },
  );

const app = new Application();
app.use(responseTimeHeader);
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
