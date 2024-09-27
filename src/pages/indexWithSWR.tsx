import Head from "next/head"
import SearchInput from "@/client/components/ui/Input/SearchInput"
import Players from "@/client/components/Players"
import { useState } from "react"
import Pagination from "@/client/components/Pagination"
import useSWR from "swr"

export default function Home() {
    const [search, setSearch] = useState<string>("")
    const [page, setPage] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    const [limit, setLimit] = useState<number>(6)

    const handleSWRSearch = (e: any) => setSearch(e.target.value)
    const handleSWRPagination = (pageId: number) =>
        setPage(
            pageId <= 0
                ? 1
                : pageId <= Math.ceil(total / limit)
                ? pageId
                : Math.ceil(total / limit)
        )

    const { data, isLoading, error } = useSWR(
        `/api/players?search=${search}&limit=${limit}&page=${page}`,
        (...args) => {
            console.log("fetching")
            return fetch(...args).then((res) => res.json())
        },
        {
            onSuccess: (data) => setTotal(data.count),
        }
    )
    return (
        <main>
            <div className="container mx-auto flex flex-col gap-4 justify-center items-center px-4 mt-6">
                <div className="flex w-full justify-around items-cente">
                    <SearchInput
                        className="w-[60%] border-b-2"
                        onChange={(e) => handleSWRSearch(e)}
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
                    <Players players={data.data} />
                )}
                <Pagination pagination={handleSWRPagination} pageId={page} />
            </div>
        </main>
    )
}
