import { NextApiRequest, NextApiResponse } from "next"
import playerService from "../../Service/service"
import { Params } from "@types"

type Service = (params: Params) => Promise<any>

export const createHandler = (service: Service) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const { query } = req;
            const firstname = query["firstname"] && 
            String(query["firstname"]) != 'undefinded' ? String(query["firstname"]) : '';

            const player = await service({ search: firstname });
            
            res.status(200).json(player.data[0])
        } catch (error) {
            // console.log('Handler Error', error);
            res.status(500).json({ message: "Sorry something went wrong!" })
        }
    }
}

export default createHandler(playerService)
