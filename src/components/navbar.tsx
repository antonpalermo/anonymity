import option from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Navbar() {
  const session = await getServerSession(option)

  return (
    <nav className="w-full">
      <div className="max-w-7xl mx-auto py-5">
        <div className="inline-flex w-full items-center justify-between">
          <h1>Anonymity</h1>
          <div>
            <Link href={"/incident/create"}>Create</Link>
            <img
              src={session?.user.image!}
              alt="user avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}
