import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        await connectMongoDB()

        const url = new URL(request.url)
        const page = parseInt(url.searchParams.get('page') || '1', 10)
        const limit = parseInt(url.searchParams.get('limit') || '10', 10)
        const skip = (page - 1) * limit

        const users = await User.find().select('-password').skip(skip).limit(limit)
        const totalUsers = await User.countDocuments()

        if (!users || users.length === 0) {
            return NextResponse.json({ message: "No users found" }, { status: 404 })
        }

        return NextResponse.json({ users, total: totalUsers, limit: limit }, { status: 200 })
    } catch (error) {
        console.error("Error fetching users:", error)
        if (error instanceof Error) {
            return NextResponse.json({ message: "Gagal fetch data", error: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ message: "Gagal fetch data", error: "Unknown error occurred" }, { status: 500 })
        }
    }
}