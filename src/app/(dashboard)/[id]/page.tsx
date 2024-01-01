import { getServerSession } from "next-auth"
import option from "@/app/api/auth/[...nextauth]/options"

export default async function DashboardPage() {
  const { user } = await getServerSession(option)

  return <h1>{JSON.stringify(user)}</h1>
}
