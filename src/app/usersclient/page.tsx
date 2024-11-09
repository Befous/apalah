"use client"

import Loading from "@/components/Loading"
import { useEffect, useState } from "react"
import Pagination from '@/components/Pagination'

export default function Users({ searchParams }: { searchParams?: { page?: number } }) {
    const currentPage = Number(searchParams?.page) || 1
    const [usersData, setUsersData] = useState<{ users: any[]; total: number; limit: number } | null>(null)

    useEffect(() => {
        const fetchData = async (page: number, limit: number) => {
            const response = await fetch(`api/users?page=${page}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const data = await response.json()
            
            setUsersData({
                users: data.users,
                total: data.total,
                limit: limit
            })
        }

        fetchData(currentPage, 20)
    }, [currentPage])

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
