import { createTeam } from "@/app/(dashboard)/team/create/actions"
import SubmitButton from "@/components/submit"

export default async function CreateTeamPage() {
  return (
    <form action={createTeam}>
      <input id="name" name="name" type="text" />
      <SubmitButton>Create</SubmitButton>
    </form>
  )
}
