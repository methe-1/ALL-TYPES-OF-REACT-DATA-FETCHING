import Head from "next/head"
import SearchInput from "@/client/components/ui/Input/SearchInput"
import Players from "@/client/components/Players"
import { useEffect, useState } from "react"
import { Player } from "@types"
import Pagination from "@/client/components/Pagination"

export default function Home() {
    const [players, setPlayers] = useState<Player[]>([])
    const [search, setSearch] = useState<string>("")
    const [page, setPage] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    const [limit, setLimit] = useState<number>(6)

    const [error, setError] = useState<string>("")
    const [isLoading, setLoading] = useState<boolean>(true)

    const handleSearch = (e: any) => setSearch(e.target.value)
    const handlePagination = (pageId: number) =>
        setPage(
            pageId <= 0
                ? 1
                : pageId <= Math.ceil(total / limit)
                ? pageId
                : Math.ceil(total / limit)
        )

    useEffect(() => {
        const controller = new AbortController()
        setLoading(true)
        fetch(`/api/players?search=${search}&limit=${limit}&page=${page}`, {
            signal: controller.signal,
        })
            .then((res) => res.json())
            .then((playerData: any) => {
                setPlayers(playerData.data)
                setTotal(playerData.count)
                setLoading(false)
            })
            .catch((err) => {
                if (err.name == "AbortError")
                    console.log("The User cancelled the fetch")
                else setError(JSON.stringify(err))
            })

        return () => controller.abort()
    }, [search, page, limit])

    return (
        <main>
            <div className="container mx-auto flex flex-col gap-4 justify-center items-center px-4 mt-6">
                <div className="flex w-full justify-around items-cente">
                    <SearchInput
                        className="w-[60%] border-b-2"
                        onChange={(e) => handleSearch(e)}
                        value={search}
                    />
                    <div className="bg-black text-white flex items-center justify-center p-2 rounded-md">
                        {total}
                    </div>
                </div>
                {error ? (
                    <div>
                        {process.env.NEXT_PUBLIC_DEBUG == "true"
                            ? JSON.stringify(error)
                            : "Sorry something went wrong!"}
                    </div>
                ) : isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <Players players={players} />
                )}
                <Pagination pagination={handlePagination} pageId={page} />
            </div>
        </main>
    )
}
