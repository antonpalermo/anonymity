import { notFound } from "next/navigation"

import prisma from "@/db/prisma"
import Navbar from "@/components/navbar"

export default async function DashboardLayout({
  children,
  params: { id }
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const team = await prisma.team.findUnique({ where: { id } })

  if (!team) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-5">{children}</div>
      </main>
    </>
  )
}
