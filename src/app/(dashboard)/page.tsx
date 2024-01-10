import team from "@/utils/helpers/team"
import { redirect } from "next/navigation"

export default async function RootPage() {
  // get all available team
  const teamDetails = await team.getTeam()

  // if no team created then redirect user to create page.
  if (!teamDetails) {
    redirect("/team/create")
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}
