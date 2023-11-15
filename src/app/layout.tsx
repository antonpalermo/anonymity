import { Inter } from "next/font/google"
import { getServerSession } from "next-auth"

import "../styles/globals.css"

import option from "./api/auth/[...nextauth]/options"
import SessionProvider from "../providers/session"

export const metadata = {
  title: "Anonymity",
  description: "Anonymize someone's inquries and reports."
}

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(option)

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}
