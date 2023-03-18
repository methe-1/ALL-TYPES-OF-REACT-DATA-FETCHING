import playerService, { lookFor } from './service';
import playersExpected from  '../players.json';

describe('Service Layer', () => {

  describe('Service', () => {
    it('should return 6 first players', async () => {
      const players =  await playerService({});
      expect(players).toEqual({
        data: playersExpected.slice(0, 6),
        limit: 6,
        page: 1
      });
    })
    
    it('should return all players', async () => {
      const players =  await playerService({ limit: playersExpected.length });
      
      expect(players).toEqual({
        data: playersExpected,
        limit: playersExpected.length,
        page: 1
      });
  
    })
  
    it('should return the right page of the players', async () => {
      const players =  await playerService({ page: 3 });
      
      expect(players).toEqual({
        data: playersExpected.slice(12, 18),
        limit: 6,
        page: 3
      });
    })

    it('should return the last page if the index is greater than the data length', async () => {
      const players =  await playerService({ page: 50000 });
      let page = Math.ceil(playersExpected.length / 6); 
      let index = (page - 1) * 6;
      expect(players).toEqual({
        data: playersExpected.slice(index, index + 6),
        limit: 6,
        page: 4
      });
    })
  })

  describe('Search', () => {
    it('should search, and send back the array of the right players', async () => {
      expect(lookFor('Hazard')).toEqual([
        {
          firstname:"Eden",
          lastname:"Hazard",
          goal: 93,
          salary: 118000000,
          devise: "$",
          pictureURl: "https://img.a.transfermarkt.technology/portrait/big/50202-1537861483.jpg?lm=1"
        }
      ]);
    })
  
    it('should send back nothing', async () => {
      expect(lookFor('')).toEqual([]);
    })
  })
  
})
