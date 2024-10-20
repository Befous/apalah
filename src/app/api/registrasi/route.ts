import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
    try {
        const { name, username, password, role } = await req.json()
        await connectMongoDB()

        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return NextResponse.json({ message: "Username sudah dipakai" }, { status: 400 })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        await User.create({ name, username, password: hashPassword, role })

        return NextResponse.json({ message: "Berhasil registrasi" }, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Gagal registrasi" }, { status: 500 })
    }
}