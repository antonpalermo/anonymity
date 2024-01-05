import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import option from "@/app/api/auth/[...nextauth]/options"

export default async function RootPage() {
  const { user } = await getServerSession(option)

  if (!user.team) {
    redirect("/create")
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}
