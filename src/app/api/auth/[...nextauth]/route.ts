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
        maxAge: 2 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
              session.user.name = token.name
              session.user.username = token.username
              session.user.role = token.role
              session.user.id = token.id
              session.user.access_token = token.access_token
            }
            return session
        },
        async jwt({ token, user }: {token: any; user: any}) {
            if (user) {
                token.name = user.name
                token.username = user.username
                token.role = user.role
                token.id = user.id
                token.access_token = user.access_token
            }
            return token
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions }