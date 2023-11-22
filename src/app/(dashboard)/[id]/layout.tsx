import { notFound } from "next/navigation"

import prisma from "@/db/prisma"

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
    <div>
      <h1>Dashboard Layout</h1>
      {children}
    </div>
  )
}
