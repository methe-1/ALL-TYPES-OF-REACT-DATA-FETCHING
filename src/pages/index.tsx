import Head from "next/head"
import SearchInput from "@/client/components/ui/Input/SearchInput"
import Players from "@/client/components/Players"
import { useCallback, useEffect, useState } from "react"
import { Player } from "@types"
import Pagination from "@/client/components/Pagination"
import Link from "next/link"

export default function Home() {
    const examples = [
        {
            href: "/indexSSR",
            title: "GetServerSideProps (SSR)",
        },
        {
            href: "/indexWithSWR",
            title: "useSWR (CSR)",
        },
        {
            href: "/indexWithUseQuery",
            title: "UseQuery (CSR)",
        },
        {
            href: "/indexDeclarativeUseEffect",
            title: "Declarative UseEffect (CSR)",
        },
        {
            href: "/indexImperativeUseEffect",
            title: "Imperative UseEffect (CSR)",
        },
    ]
    return (
        <main className=" h-screen flex items-center justify-center ">
            <div className="container mx-auto flex flex-col justify-center items-center">
                <div className="mb-5">
                    Each Example uses a different way to fetch data,{" "}
                    <strong>CLICK TO DISCOVER</strong>
                </div>
                <div className="flex flex-col">
                    {examples.map((exp, i) => (
                        <Link
                            href={exp.href}
                            key={i}
                            className="py-2 px-3  mb-3 cursor-pointer shadow-md shadow-black hover:shadow-md  w-full text-center bg-gray-800 text-white rounded-md"
                        >
                            {exp.title}
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )
}
