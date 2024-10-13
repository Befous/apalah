'use client'

import { SessionProvider } from "next-auth/react";

type AuthProviderProps = {
    children: React.ReactNode; // Define the type for children
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    return <SessionProvider>{children}</SessionProvider>;
}
