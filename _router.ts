import {
  Status,
  Router,
  Application,
} from "./deps.ts";

import {
  rawBodyState,
  verifySlackHeader,
  verifyAPI,
} from "./_middleware.ts";

const router = new Router();
router
  .get(
    "/",
    async (context) => {
      context.response.redirect(
        "https://github.com/hkatzdev/bank-bot/tree/prohacks",
      );
    },
  )
  .get("/ping", async (context) => {
    context.response.body = "pong!";
  })
  .post(
    "/events",
    rawBodyState,
    verifySlackHeader,
    verifyAPI,
    async (context) => {
      const jsonBody = JSON.parse(context.state.body);
      context.response.body = jsonBody.challenge;
    },
  ) //410
  .post("/fine", async (context) => {
    context.response.status = Status.Gone;
    context.response.body =
      "Will never be implemented due to potential abuse - url reserved for legacy purposes";
  });

export { router };
