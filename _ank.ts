import {
  Status,
  Router,
} from "./deps.ts";

// New Ank API
const ank_router = new Router();
ank_router
  .get("/balance", async (context) => {
  })
  .get("/users", async (context) => {
  })
  .get("/starting-amount", async (context) => {
  })
  .get("/transfer", async (context) => {
  });

export { ank_router };
