import { NextApiRequest, NextApiResponse } from "next"
import getPlayers, { createHandler } from "./Handler/handlers"
import { createMocks } from "node-mocks-http"
import playerService from "./Service/service"
import players from "./players.json"
import RouteHandler from "./Router/routers"

describe("Handler", () => {
    // let { spy } =  sinon.createSandbox();

    describe("Handler -> Service", () => {
        it("should succeed with 200OK and body of players", async () => {
            const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
                method: "GET",
                url: `/api/players`,
            })

            req.query["search"] = ""
            req.query["page"] = "1"
            req.query["limit"] = "6"

            const expectedData = {
                data: players.slice(0, 6),
                limit: 6,
                page: 1,
                count: players.length

            }

            const getPlayers = createHandler(playerService)
            await getPlayers(req, res)

            expect(res.statusCode).toBe(200)
            expect(res._getJSONData()).toEqual(expectedData)
        })

        it("should send the last page if the page offset is greater than the data length", async () => {
            const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
                method: "GET",
                url: `/api/players`,
            })

            req.query["search"] = ""
            req.query["page"] = "5"
            req.query["limit"] = "10"

            let limit = 10
            let page = Math.ceil(players.length / limit); 
            let index = (page - 1) * limit;

            const expectedData = {
                data: players.slice(index, index + limit),
                limit,
                page: page,
                count: players.length

            }

            const getPlayers = createHandler(playerService)
            await getPlayers(req, res)

            expect(res.statusCode).toBe(200)
            expect(res._getJSONData()).toEqual(expectedData)
        })

        it("should send the searched player", async () => {
            const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
                method: "GET",
                url: `/api/players`,
            })

            req.query["search"] = "Hazard"
            req.query["page"] = "1"
            req.query["limit"] = "6"

            const expectedData = {
                data: players.slice(0, 1), // cuz there's only one Hazard
                limit: 6,
                page: 1,
                count: 1 // there's only one Hazard
            }

            const getPlayers = createHandler(playerService)
            await getPlayers(req, res)

            expect(res.statusCode).toBe(200)
            expect(res._getJSONData()).toEqual(expectedData)
        })
    })

    describe("Router -> Service", () => {
        it("should succeed with 200OK and body of players", async () => {
            const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
                method: "GET",
                url: `/api/players`,
            })

            req.query["search"] = ""
            req.query["page"] = "1"
            req.query["limit"] = "6"

            const expectedData = {
                data: players.slice(0, 6),
                limit: 6,
                page: 1,
                count: players.length
            }

            await RouteHandler(req, res, {
                GET: getPlayers,
            })

            expect(res.statusCode).toBe(200)
            expect(res._getJSONData()).toEqual(expectedData)
        })

        it("should send the right page", async () => {
            const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
                method: "GET",
                url: `/api/players`,
            })
    
            req.query["search"] = ""
            req.query["page"] = "4"
            req.query["limit"] = "6"
    
            const expectedData = {
                data: players.slice(18, 24),
                limit: 6,
                page: 4,
                count: players.length
            }
    
            await RouteHandler(req, res, {
                GET: getPlayers 
            })
    
            expect(res.statusCode).toBe(200)
            expect(res._getJSONData()).toEqual(expectedData)
        })

        it("should send the last page if the page index exceeds the data length", async () => {
            const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
                method: "GET",
                url: `/api/players`,
            })
    
            req.query["search"] = ""
            req.query["page"] = "500000"
            req.query["limit"] = "10"
            
            let limit = 10
            let page = Math.ceil(players.length / limit); 
            let index = (page - 1) * limit;

            const expectedData = {
                data: players.slice(index, index + limit),
                limit,
                page: page,
                count: players.length
            }
    
            await RouteHandler(req, res, {
                GET: getPlayers 
            })
    
            expect(res.statusCode).toBe(200)
            expect(res._getJSONData()).toEqual(expectedData)
        })
    })
})
