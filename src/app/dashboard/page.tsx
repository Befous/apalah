"use client"

import { useSession } from "next-auth/react"

export default function Dashboard() {
    const { data: session } = useSession()
    return (
        <div className="w-full">
            <div className="container w-1/2 p-4 mx-auto text-center border">
                <div className="overflow-x-auto">
                    <h1>Ceritanya dashboard</h1>
                    <p>Nama = {session?.user?.name || ''}</p>
                    <p>Username = {session?.user?.username || ''}</p>
                    <p>Role = {session?.user?.role || ''}</p>
                </div>
            </div>
        </div>
    )
}
