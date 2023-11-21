import { teamSchema } from "@/libs/schema/teamSchema"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  // get team details in the request body.
  const body = await req.json()
  // parse and validate the request body
  const result = teamSchema.safeParse(body)

  if (result.success === false) {
    const parsedErrors = result.error.issues.map(e => ({
      name: e.path.at(0),
      message: e.message
    }))

    return NextResponse.json({ errors: parsedErrors }, { status: 400 })
  }

  return NextResponse.json({ message: "sample" }, { status: 200 })
}
