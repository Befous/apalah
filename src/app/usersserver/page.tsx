"use server"

import { fetchUsers } from '@/lib/data'
import Pagination from '@/components/Pagination'

export default async function Users({ searchParams }: { searchParams?: { page?: string } }) {
    const currentPage = Number(searchParams?.page) || 1
    const { users, total, limit } = await fetchUsers(currentPage, 20)

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
