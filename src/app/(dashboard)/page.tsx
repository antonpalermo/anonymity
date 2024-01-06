import { getServerSession } from "next-auth"

import team from "@/libs/actions/team"
import option from "@/app/api/auth/[...nextauth]/options"

export default async function RootPage() {
  // check session token
  const { user } = await getServerSession(option)
  // get all available team
  const teamMetadata = await team.find(user.email)

  return (
    <div>
      <h1>Dashboard</h1>
      {JSON.stringify(teamMetadata)}
    </div>
  )
}
