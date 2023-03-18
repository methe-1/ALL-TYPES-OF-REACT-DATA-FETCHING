import { NextApiRequest, NextApiResponse } from "next"
import RouteHandler from "./routers";
import players from "../players.json"
import { createMocks } from "node-mocks-http"
import sinon from "sinon"

describe("router", () => {
    it("should succeed & send back data ", async () => {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: "GET",
            url: `/api/players`,
        })
        const fakeData = {
          data: players.slice(0, 6),
          limit: 6,
          page: 1
        }
        
        await RouteHandler(req, res, {
            GET: sinon.fake((req, res) => {
              res.status(200).json(fakeData);
            }),
        })
        expect(res.statusCode).toBe(200);       
        expect(res._getJSONData()).toEqual(fakeData);
    })

    it("should be only a GET method", async () => {
      const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
          method: "PUT",
          url: `/api/players`,
        })

        const fakeData = {
          data: players.slice(0, 6),
          limit: 6,
          page: 1
        }
        
        await RouteHandler(req, res, {
            GET: sinon.fake((req, res) => {
              res.status(200).json(fakeData);
            }),
        })

        expect(res.statusCode).toBe(405);       
        expect(res._getData()).toBe("Not Allowed!!");
    })
})
