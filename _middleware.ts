import {
  decode,
  Status,
  Middleware,
  ErrorStatus,
  verifySlackRequest,
} from "./deps.ts";

export const rawBodyState: Middleware = async (context, next) => {
  decode(
    await Deno.readAll(
      (await (context.request.body({
        asReader: true,
      }))).value,
    ),
  );
  await next();
};

export const verifySlackHeader: Middleware = async (context, next) => {
  const status = verifySlackRequest(
    context.request.headers,
    context.state.body,
  );
  if (status === Status.OK) await next();
  else context.throw(status as ErrorStatus);
};

// For Hackathon Judging Purposes ignore this function (verifyAPI) - this is a requirement of the Hack Club slack.
export const verifyAPI: Middleware = async (context, next) => {
  const check = await fetch("https://slack.hosted.hackclub.com", {
    method: "POST",
    body: context.state.body,
  });
  if (check.ok === true) await next();
  else {
    context.response.headers = check.headers;
    context.response.body = await check.text();
  }
};
