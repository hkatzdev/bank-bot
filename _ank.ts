import {
  Status,
  Router,
} from "./deps.ts";

import {
  isBalance,
  isUsers,
  isStartAmt,
  isPayment,
} from "_typeguards.ts";

// New Ank API
const ank_router = new Router();
ank_router
  .get("/balance", async (context) => {
    const options = getQuery(context);
    if (isBalance(options)) true;
    else context.throw(Status.BadRequest);
  })
  .get("/users", async (context) => {
    const options = getQuery(context);
    if (isUsers(options)) true;
    else context.throw(Status.BadRequest);
  })
  .get("/starting-amount", async (context) => {
    const options = getQuery(context);
    if (isUsers(options)) true;
    else context.throw(Status.BadRequest);
  })
  .post("/transfer", rawBodyState, jsonBody, verifyAPI, async (context) => {
    const body = context.state.body;
    if (isUsers(options)) true;
    else context.throw(Status.BadRequest);
  });

export { ank_router };
