import {
  Status,
  Router,
} from "./deps.ts";

import {
  jsonBody,
  verifyAPI,
  rawBodyState,
  verifySlackHeader,
} from "./_middleware.ts";

import {
  isLegacy,
  Payment,
} from "./_typeguards.ts";

import {
  ank_router,
} from "./_ank.ts";

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
    jsonBody,
    verifyAPI,
    async (context) => {
      const jsonBody = JSON.parse(context.state.body);
      context.response.body = jsonBody.challenge;
    },
  )
  // Legacy Banker API
  .post("/give", rawBodyState, jsonBody, verifyAPI, async (context) => {
    const body = context.state.body;
    if (isLegacy(body)) {
      const fixedBody: Payment = {
        payer: body.bot_id,
        receiver: body.send_id,
        amount: body.gp,
        key: body.token,
      };
      if (body.reason) fixedBody.reason = body.reason;
      true;
    } else context.throw(Status.BadRequest);
  })
  .post("/fine", async (context) => {
    context.response.status = Status.Gone;
    context.response.body =
      "Will never be implemented due to potential abuse - url reserved for legacy purposes";
  })
  // New Ank API
  .use("/api", ank_router.routes(), ank_router.allowedMethods());

export { router };
