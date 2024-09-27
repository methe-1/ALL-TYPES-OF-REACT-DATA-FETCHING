import { RouteHandler, getPlayers } from "../../../Server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await RouteHandler(req, res, {
    GET: getPlayers
  });
}