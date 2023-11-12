import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"

import "../styles/globals.css"

export const metadata = {
  title: "FYEO",
  description: "For your eyes only! Hope that's clear for everyone."
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
