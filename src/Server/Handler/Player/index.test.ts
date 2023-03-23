import { NextApiRequest, NextApiResponse } from "next";
import { createHandler } from ".";
import { createMocks } from "node-mocks-http";
import sinon from 'sinon';
import players from '../../players.json';


describe("Handler: Player", () => {
  // let { spy } =  sinon.createSandbox();

  it("should succeed with 200OK and body of players", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
      url: `/api/players/`,
      query: {
        firsname: 'Eden'
      }
    })
    
    const fakeData = players.find(p => p.firstname == "Eden")

    const service = sinon.fake.resolves({ data: [fakeData]});

    const getPlayer = createHandler(service);
    await getPlayer(req, res)

    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual(fakeData);

    expect(service.calledOnce).toBeTruthy();
    
  });

  it('should handle an error and send back a message', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
      url: `/api/players`,
      query: {
        firsname: 'Eden'
      }
    })

    const service = sinon.fake.throws(new Error('Service Layer Error' ));

    const getPlayers = createHandler(service);
    await getPlayers(req, res)

    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ message: 'Sorry something went wrong!'})
  })

});
