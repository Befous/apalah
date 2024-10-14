import "next-auth";

declare module "next-auth" {
    interface User {
        id: number,
        name: string,
        username: string,
        role: string
    }

    interface Session {
        user: User
    }
}