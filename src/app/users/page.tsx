import AcccessDenied from "@/components/AccessDenied"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { fetchUsers } from '@/lib/data'
import Pagination from '@/components/Pagination'
import Link from "next/link"

// Page component
export default async function Users({searchParams}: {
    searchParams?: {
        page?: string
    }
}) {
    const session = await getServerSession(authOptions)
    const currentPage = Number(searchParams?.page) || 1
    const { users, total, limit } = await fetchUsers(currentPage, 20)
    const totalPages = Math.ceil(total / limit)

    if (!session || session.user.role !== "owner") {
        return <AcccessDenied />
    }

    return (
        <div className="w-full">
            
            <div className="container w-1/2 p-4 mx-auto text-center border">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Username
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Update</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Delete</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {users.map((user: { username: string; name: string; role: string }) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={user.username}>
                                <td className="px-6 py-4">
                                    {user.username}
                                </td>
                                <td className="px-6 py-4">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4">
                                    {user.role}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={{ pathname: 'users/update', query: { username: user.username, role: user.role } }} className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                        Update
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={{ pathname: 'users/delete', query: { username: user.username } }} className="font-medium text-red-600 hover:underline dark:text-red-500">
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex flex-col items-center mt-5">
                <span className="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{(currentPage - 1) * limit + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{Math.min(currentPage * limit, total)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{total}</span> Entries
                </span>
                <div className="mt-5 mb-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />  
                </div>
            </div>
        </div>
    )
}