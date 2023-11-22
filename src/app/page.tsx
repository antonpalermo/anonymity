import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import prisma from "@/db/prisma"
import option from "@/app/api/auth/[...nextauth]/options"

export default async function RootPage() {
  const {
    user: { email }
  } = await getServerSession(option)
  const team = await prisma.team.findFirst({
    where: {
      members: { every: { user: { email } } }
    }
  })

  if (!team) {
    redirect("/create")
  }

  redirect(`/${team.id}`)
}
