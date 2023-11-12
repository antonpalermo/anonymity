import { UserButton } from "@clerk/nextjs"

export default function RootPage() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <h1 className="text-green-400">Sample</h1>
    </div>
  )
}
