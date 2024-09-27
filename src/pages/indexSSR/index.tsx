import Head from "next/head"
import SearchInput from "@/client/components/ui/Input/SearchInput"
import Players from "@/client/components/Players"
import { useCallback, useState } from "react"
import { PlayerData, Player } from "@types"
import Pagination from "@/client/components/Pagination"
import { GetServerSideProps } from "next"

export default function Home({
    initialPlayers,
}: {
    initialPlayers: PlayerData<Player[]>
}) {
    const [players, setPlayers] = useState<Player[]>(initialPlayers.data)
    const [search, setSearch] = useState<string>("")
    const [page, setPage] = useState<number>(1)
    const [total, setTotal] = useState<number>(initialPlayers.count || 0)
    const [limit, setLimit] = useState<number>(6)

    // IMPERATIVE WAY
    const handlePagination = useCallback(
        (pageId: number) => {
            pageId =
                pageId <= 0
                    ? 1
                    : pageId <= Math.ceil(total / limit)
                    ? pageId
                    : Math.ceil(total / limit)

            fetch(`/api/players?search=${search}&limit=${limit}&page=${pageId}`)
                .then((res) => res.json())
                .then((playersData: any) => {
                    setPlayers(playersData.data)
                    setPage(playersData.page) // or pageId
                    setTotal(playersData.count)
                })
                .catch((err) => console.log(err))

            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        [search, limit, total]
    )

    // IMPERATIVE WAY
    const handleSearch = useCallback(
        (searchText: string) => {
            fetch(
                `/api/players?search=${searchText}&limit=${limit}&page=${page}`
            )
                .then((res) => res.json())
                .then((playersData: any) => {
                    setPlayers(playersData.data)
                    setPage(playersData.page)
                    setSearch(searchText)
                    setTotal(playersData.count)
                })
                .catch((err) => console.log(err))
        },
        [page, limit]
    )

    return (
        <main>
            <div className="container mx-auto flex flex-col gap-4 justify-center items-center px-4 mt-6">
                <div className="flex w-full justify-around items-cente">
                    <SearchInput
                        className="w-[60%] border-b-2"
                        onChange={(e) => handleSearch(e.target.value)}
                        value={search}
                    />
                    <div className="bg-black text-white flex items-center justify-center p-2 rounded-md">
                        {total}
                    </div>
                </div>
                <Players players={players} />
                <Pagination pagination={handlePagination} pageId={page} />
            </div>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps<{
    initialPlayers: PlayerData<Player[]>
}> = async ({ query }) => {
    const { search = "", page = 1, limit = 6 } = query
    const resp = await fetch(
        `${process.env.BACKEND_URL}/players?search=${search}&limit=${limit}&page=${page}`
    )

    const data = await resp.json()

    return {
        props: { initialPlayers: data },
    }
}
