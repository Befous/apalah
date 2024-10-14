'use client'
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import AcccessDenied from "@/components/AccessDenied"


export default function Users() {
    const { data: session, status } = useSession()
    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }
    if (status === "unauthenticated") {
        return (
            <AcccessDenied />
        )
    }
    if (session?.user.role !== "owner") {
        return (
            <AcccessDenied />
        )
    }
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello ini halaman users</h1>
                    <button onClick={() => signOut()}>Logout</button>
                </div>
            </div>
        </div>
    )
}
