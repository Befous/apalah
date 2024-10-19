// Users.tsx (Client Component)
"use client"

import AccessDenied from "@/components/AccessDenied"
import Loading from "@/components/Loading"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { fetchUsers } from '@/lib/data'
import Pagination from '@/components/Pagination'

export default function Users({ searchParams }: { searchParams?: { page?: string } }) {
    const { data: session, status } = useSession()
    const currentPage = Number(searchParams?.page) || 1
    const [usersData, setUsersData] = useState<{ users: any[]; total: number; limit: number } | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const { users, total, limit } = await fetchUsers(currentPage, 20)
            setUsersData({ users, total, limit })
        }

        if (status === "authenticated") {
            fetchData()
        }
    }, [currentPage, status])

    if (status === "loading") {
        return <Loading />
    }

    if (status === "unauthenticated") {
        return <AccessDenied />
    }

    if (!session || session.user.role !== "owner") {
        return <AccessDenied />
    }

    // Check if usersData is still null
    if (!usersData) {
        return <Loading />
    }

    const { users, total, limit } = usersData
    const totalPages = Math.ceil(total / limit)

    return (
        <div className="w-full">
            <div className="container w-1/2 p-4 mx-auto text-center border">
                <div className="overflow-x-auto">
                    <table className="table table-zebra place-content-center">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user: { username: string; name: string; role: string }) => (
                                <tr key={user.username}>
                                    <th>{user.username}</th>
                                    <th>{user.name}</th>
                                    <th>{user.role}</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    )
}
