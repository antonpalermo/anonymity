import prisma from "@/db/prisma"
import CreateForm from "@/components/teams/create-form"
import { getServerSession } from "next-auth"
import option from "@/app/api/auth/[...nextauth]/options"

import { redirect } from "next/navigation"

export default async function CreateTeamPage() {
  const {
    user: { email }
  } = await getServerSession(option)
  const team = await prisma.team.findFirst({
    where: { members: { some: { user: { email } } } }
  })

  if (team) {
    redirect(`/${team.id}`)
  }

  return <CreateForm />
}
