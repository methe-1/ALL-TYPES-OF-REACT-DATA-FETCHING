import { NextApiRequest, NextApiResponse } from "next"
import playerService from "../Service/service"
import { Params } from "@types"

type Service = (params: Params) => Promise<any>

export const createHandler = (service: Service) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            // @ts-ignore
            const players = await service({ search: req.query["search"], page: Number.parseInt(req.query["page"]), limit: Number.parseInt(req.query["limit"]),
            })
            res.status(200).json(players)
        } catch (error) {
            // console.log('Handler Error', error);
            res.status(500).json({ message: "Sorry something went wrong!" })
        }
    }
}

export default createHandler(playerService)
