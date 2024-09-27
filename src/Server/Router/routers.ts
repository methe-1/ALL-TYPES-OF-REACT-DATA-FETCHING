import type { NextApiRequest, NextApiResponse } from "next";
import type { HttpMethod, RouteHandlerParams } from '@types';

export default async function RouteHandler(
  request: NextApiRequest,
  response: NextApiResponse,
  handlers: RouteHandlerParams
) {
  const method = request.method as HttpMethod;
  const handler = handlers[method];

  if (!handler) {
    return response.status(405).send("Not Allowed!!");
  }

  await handler(request, response);
}