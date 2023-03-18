import { FunctionComponent } from "react";
import { Player } from "@types";
import Image from "next/image";
import { cn } from "@/client/utils";

const Crad: FunctionComponent<Player> = ({
  firstname,
  lastname,
  pictureURl,
  devise,
  salary,
  goal
}: Player) => {
  const defaultImage = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'
  return (
    <div className="bg-white border h-[100%]">
      <Image src={pictureURl || defaultImage} className={cn('aspect-square', pictureURl ? 'object-contain' : 'object-cover')} height={300} width={300} alt={`${firstname} ${lastname}`} />
      <div className="flex justify-around">
        <span className="">{firstname} {lastname}</span>
        <span className="">{devise}{String(salary).length < 6 ? salary : `${(salary / 1_000_000).toFixed(2)}M`}</span>
      </div>
      <div className="text-center">
        Goals: {goal}
      </div>
    </div>
  );
};

export default Crad;
