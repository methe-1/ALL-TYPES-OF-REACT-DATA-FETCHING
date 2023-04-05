import { NextApiRequest, NextApiResponse } from "next"
import { getPlayer } from "../../Service/service"
import { Player } from "@types"

type Service = (input: string) => Promise<{ data: Player | undefined }> 

export const createHandler = (service: Service) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const { query } = req;
            const firstname = query["firstname"] && 
            String(query["firstname"]) != 'undefinded' ? String(query["firstname"]) : '';

            const player = await service(firstname);
            
            res.status(200).json(player)
        } catch (error) {
            // console.log('Handler Error', error);
            res.status(500).json({ message: "Sorry something went wrong!" })
        }
    }
}

export default createHandler(getPlayer);
