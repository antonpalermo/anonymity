import prisma from "@/db/prisma"
import CreateForm from "@/components/teams/create-form"
import { getServerSession } from "next-auth"
import option from "@/app/api/auth/[...nextauth]/options"

import { redirect } from "next/navigation"

export default async function CreateTeamPage() {
  const {
    user: { email }
  } = await getServerSession(option)
  const { id } = await prisma.team.findFirst({
    where: { members: { some: { user: { email } } } }
  })

  if (id) {
    redirect(`/${id}`)
  }

  return <CreateForm />
}
