import { Params } from "@types"
import players from "../players.json"

const playerService = async ({ search = "", page = 1, limit = 6 }: Params = {}) => {
    
    try {
        let index = (page - 1) * limit
        const result = search.length ? lookFor(search) : players;

        if (index > result.length){
            page = Math.ceil(result.length / limit); 
            index = (page - 1) * limit;
        }
        else if(index < 0){
            index = 0;
            page = 1;
        }

        return {
            data: result.slice(index, index + limit),
            limit: limit,
            page: page,
            count: result.length
        }
    } catch (error) {
        // console.log('error returning the players from service', error);
        throw new Error("Service Layer Error")
    }
}

export function lookFor(input: string): any[] {
    if (!input.length) return []

    const founds: any[] = []
    players.forEach((player) => {
        if (
            player.firstname.toLowerCase().includes(input.toLowerCase()) ||
            player.lastname.toLowerCase().includes(input.toLowerCase())
        ) {
            founds.push(player)
        }
    })
    return founds
}

export default playerService
