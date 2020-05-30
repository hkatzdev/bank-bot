import {
  Status,
  Middleware,
  ErrorStatus,
  verifySlackRequest,
} from "./deps.ts";

export const textBodyState: Middleware = async (context, next) => {
  context.state.body = await (context.request.body({
    contentTypes: {
      text: ["application/javascript"],
    },
  }) || "");
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
