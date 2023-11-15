"use client"

import { ReactNode } from "react"
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

export interface SessionProviderProps {
  session: any
  children: ReactNode
}

export default function SessionProvider({
  session,
  children
}: SessionProviderProps) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  )
}
