import { NextApiRequest, NextApiResponse } from "next"

export interface Params {
    search?: string
    page?: number
    limit?: number
}

export interface Pagination {
    pagination: (pageId: number) => void
    pageId: number
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"
type HttpHandler = (request: NextApiRequest, response: NextApiResponse) => void
export interface RouteHandlerParams {
    GET?: HttpHandler
    POST?: HttpHandler
    PUT?: HttpHandler
    DELETE?: HttpHandler
}

export interface PlayerData {
    data: Player[]
    limit: number
    page: number
    count?: number
}

export interface Player {
    firstname: string
    lastname: string
    goal: number
    salary: number
    devise: string
    pictureURl: string
}
