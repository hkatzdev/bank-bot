import {
  Status,
  Router,
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
  )
  // Legacy Banker API
  .post("/give", async (context) => {
    
    const fixedBody = {
      payer: jsonBody.bot_id || jsonBody.give_id,
      receiver: jsonBody.send_id,
      amount: jsonBody.gp,
      key: jsonBody.token,
      reason: jsonBody.reason,
    };
  })
  .post("/fine", async (context) => {
    context.response.status = Status.Gone;
    context.response.body =
      "Will never be implemented due to potential abuse - url reserved for legacy purposes";
  })
  // New Ank API
  .use("/api");

export { router };
