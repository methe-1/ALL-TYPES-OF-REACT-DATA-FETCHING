import Head from "next/head"
import SearchInput from "@/client/components/ui/Input/SearchInput"
import Players from "@/client/components/Players"
import { useState } from "react"
import Pagination from "@/client/components/Pagination"
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "react-query"

// get a query client
const queryClient = new QueryClient()

export default function QueryWrapper() {
    return (
        <QueryClientProvider client={queryClient}>
            <Home />
        </QueryClientProvider>
    )
}

export function Home() {
    const [search, setSearch] = useState<string>("")
    const [page, setPage] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    const [limit, setLimit] = useState<number>(6)

    const handleQuerySearch = (e: any) => setSearch(e.target.value)

    const handleQueryPagination = (pageId: number) =>
        setPage(
            pageId <= 0
                ? 1
                : pageId <= Math.ceil(total / limit)
                ? pageId
                : Math.ceil(total / limit)
        )

    const {
        data: players,
        isLoading,
        error,
    } = useQuery(
        ["players", search, page], // array of dependencies
        () => {
            console.log("fetching")
            //! problem of double fetching when you set back the "page" onSuccess
            //* solution to this is to send a total from the backend and check if the "pageId > Math.ceil(count/limit)"
            //* if yes than don't set page
            return fetch(
                `/api/players?search=${search}&limit=${limit}&page=${page}`
            ).then((res) => res.json())
        },
        {
            onSuccess: (data) => setTotal(data.count),
            //! after setPage, Query will refetch since it depends on page as well
            //* we changed it to setting the total instead
        }
    )

    return (
        <main>
            <div className="container mx-auto flex flex-col gap-4 justify-center items-center px-4 mt-6">
                <div className="flex w-full justify-around items-cente">
                    <SearchInput
                        className="w-[60%] border-b-2"
                        onChange={(e) => handleQuerySearch(e)}
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
                    <Players players={players.data} />
                )}
                <Pagination pagination={handleQueryPagination} pageId={page} />
            </div>
        </main>
    )
}
