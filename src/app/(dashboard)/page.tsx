import { getServerSession } from "next-auth"

import option from "@/app/api/auth/[...nextauth]/options"

export default async function RootPage() {
  // check session token
  const session = await getServerSession(option)
  // get all available team

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}
