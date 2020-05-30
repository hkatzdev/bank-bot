import {
  Middleware,
  verifySlackRequest,
} from "./deps.ts";

export const bodyState: Middleware = async () => 1;
