import {
  Status,
  Router,
  helpers,
} from "./deps.ts";

import {
  isBalance,
  isUsers,
  isStartAmt,
  isPayment,
} from "./_typeguards.ts";

import {
  jsonBody,
  rawBodyState,
  verifyAPI,
} from "./_middleware.ts";

// New Ank API
const ank_router = new Router();
ank_router
  .get("/balance", async (context) => {
    const options = helpers.getQuery(context);
    if (isBalance(options)) true;
    else context.throw(Status.BadRequest);
  })
  .get("/users", async (context) => {
    const options = helpers.getQuery(context);
    if (isUsers(options)) true;
    else context.throw(Status.BadRequest);
  })
  .get("/starting-amount", async (context) => {
    const options = helpers.getQuery(context);
    if (isStartAmt(options)) true;
    else context.throw(Status.BadRequest);
  })
  .post("/transfer", rawBodyState, jsonBody, verifyAPI, async (context) => {
    const options = context.state.body;
    if (isPayment(options)) true;
    else context.throw(Status.BadRequest);
  });

export { ank_router };
