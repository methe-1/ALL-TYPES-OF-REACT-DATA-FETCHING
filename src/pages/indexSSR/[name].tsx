import { PlayerData, Player } from "@types"
import { GetServerSideProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router";

export default function Home({ player }: { player: PlayerData<Player> }) {
    const router = useRouter();
    const defaultImage = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png';
    
    return (
        <>
            <main className="bg-gray-200 h-[100svh] flex flex-col justify-center ">
                <div className="h-[8svh]">
                    <div onClick={() => router.back()} className="text-xl shadow-xl cursor-pointer bg-black w-fit text-white px-2 text-center rounded-l-xl ml-28">
                        {"Back"}
                    </div>
                </div>
                <div className="container rounded-md mx-auto flex bg-white h-[80svh]">
                    <div className="basis-3/4 bg-slate-300">
                        <Image
                            height={1000}
                            width={1000}
                            className="h-full w-full object-contain"
                            src={player?.data.pictureURl || defaultImage}
                            alt={player?.data.firstname + player?.data.lastname}
                        />
                    </div>
                    <div className="flex items-center basis-1/4">
                        <div className=" pl-2 h-[40svh] w-full flex items-center">
                            <div>
                                <div>
                                    <strong>Name: </strong>
                                    {player?.data?.firstname}{" "}
                                    {player?.data?.lastname}
                                </div>
                                <div>
                                    {" "}
                                    <strong>Goal: </strong>
                                    {player?.data?.goal}{" "}
                                </div>
                                <div>
                                    {" "}
                                    <strong>Salary: </strong>
                                    {player?.data?.devise}
                                    {String(player?.data?.salary).length < 6
                                        ? player?.data?.salary
                                        : `${(
                                              player?.data?.salary / 1_000_000
                                          ).toFixed(2)}M`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<{
    player: PlayerData<Player>
}> = async ({ query }) => {
    const { name = 0 } = query
    let data

    try {
        const resp = await fetch(`${process.env.BACKEND_URL}/players/${name}`)

        data = await resp.json()
    } catch (error) {
        console.log(error)
        data = {}
    }

    return {
        props: { player: data },
    }
}
