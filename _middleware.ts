import {
  Status,
  Middleware,
  verifySlackRequest,
} from "./deps.ts";

export const bodyState: Middleware = async (context, next) => {
  context.state.body = await context.request.body();
  await next();
};

export const verifySlackHeader: Middleware = async (context, next) => {
  const status = verifySlackRequest(
    context.request.headers,
    context.state.body,
  );
  await next();
};
