import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import option from "@/app/api/auth/[...nextauth]/options"
import CreateForm from "@/components/teams/create-form"

export default async function CreateTeamPage() {
  const session = await getServerSession(option)

  if (session?.user.team) {
    redirect(`/`)
  }

  return <CreateForm />
}
