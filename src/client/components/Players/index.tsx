import { FC } from "react";
import { cn } from "@/client/utils";
import Crad from "./Card";
import { Player } from "@types";

const Player: FC<{ players: any }> = ({ players }) => {

  // I would use Redux-Thunk, or UseQuery instead if I had enough time 
  
  return (
    <>
      <div className="min-h-[83vh] flex flex-col items-center">
        <div className="flex flex-col flex-col-xs-12">
          {players.length ? (
            <div className="grid gap-5 grid-cols-3">
              {players.slice(0, 6).map(({ firstname, lastname, pictureURl, devise, salary, goal }: Player, index: number) => (
                <div key={index} className="h-[100%]">
                    <Crad
                        firstname={firstname || 'Krim'}
                        lastname={lastname || 'Benzima'}
                        pictureURl={pictureURl}
                        devise={devise}
                        salary={salary}
                        goal={goal}
                    />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid place-items-center w-full min-h-[50vh]">
              <div className="bg-white text-black p-5 rounded-xl">
                Aucun Joueur trouvé!
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Player;
