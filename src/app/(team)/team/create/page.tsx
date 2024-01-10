import CreateForm from "@/components/teams/create-form"
import team from "@/utils/helpers/team"
import { redirect } from "next/navigation"

export default async function TeamBuilderPage() {
  const teamDetails = await team.getTeam()

  // if team is already created for this user then return to homepage.
  if (teamDetails) {
    redirect("/")
  }

  return (
    <div>
      <h1>Lets go!</h1>
      <p>To get started you need to create a team!</p>
      <CreateForm />
    </div>
  )
}
