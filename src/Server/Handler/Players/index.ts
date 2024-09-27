import { NextApiRequest, NextApiResponse } from "next"
import playerService from "../../Service/service"
import { Params } from "@types"

type Service = (params: Params) => Promise<any>

export const createHandler = (service: Service) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            
            const { query } = req;
            const search = query["search"] && String(query["search"]) != 'undefinded' ? String(query["search"]) : '';
            const page = Number(query["page"]) | 0 || 1;
            const limit = Number(query["limit"]) | 0 || 6;

            const players = await service({ search, page, limit })
            
            res.status(200).json(players)
        } catch (error) {
            // console.log('Handler Error', error);
            res.status(500).json({ message: "Sorry something went wrong!" })
        }
    }
}

export default createHandler(playerService)
