import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import { getServerSession } from "next-auth"
import "@/styles/globals.css"

import option from "@/app/api/auth/[...nextauth]/options"
import SessionProvider from "@/utils/providers/session"

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
        <Toaster position={"top-right"} />
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}
