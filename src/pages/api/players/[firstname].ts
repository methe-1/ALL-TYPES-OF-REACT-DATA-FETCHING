// Single Player Page 
import { RouteHandler, getPlayer } from "../../../Server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await RouteHandler(req, res, {
    GET: getPlayer
  });
}