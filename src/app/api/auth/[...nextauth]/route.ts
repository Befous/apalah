import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { AuthOptions } from "next-auth"
import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import bcrypt from "bcryptjs"

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},

            async authorize(credentials: Record<string, string> | undefined) {
                if (!credentials) return null
                const { username, password } = credentials

                try {
                    await connectMongoDB()
                    const user = await User.findOne({ username })

                    if (!username || !password) {
                        return null
                    }
                    
                    const passwordsMatch = await bcrypt.compare(password, user.password)
                    
                    if (!passwordsMatch) {
                        return null
                    }

                    return user
                } catch (error) {
                    console.log("Error: ", error)
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }