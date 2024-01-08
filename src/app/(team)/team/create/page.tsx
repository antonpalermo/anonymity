import CreateForm from "@/components/teams/create-form"
import { createTeam } from "@/utils/actions/team"

export default async function TeamBuilderPage() {
  return (
    <div>
      <h1>Lets go!</h1>
      <p>To get started you need to create a team!</p>
      <CreateForm action={createTeam} />
    </div>
  )
}
