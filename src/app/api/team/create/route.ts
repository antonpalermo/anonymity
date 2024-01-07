import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { teamSchema } from "@/utils/schema/team"

import prisma from "@/utils/prisma"
import option from "@/app/api/auth/[...nextauth]/options"

export async function POST(req: Request) {
  // get team details in the request body.
  const { name } = await req.json()
  const {
    user: { email }
  } = await getServerSession(option)
  // parse and validate the request body
  const result = teamSchema.safeParse({ name })
  // check if the schema is valid.
  if (result.success === false) {
    // parse error message into {name: '', message: ''}
    const parsedErrors = result.error.issues.map(e => ({
      name: e.path.at(0),
      message: e.message
    }))
    // return error with status 400 bad request
    return NextResponse.json({ errors: parsedErrors }, { status: 400 })
  }

  try {
    const isExist = await prisma.team.findFirst({
      where: { name }
    })

    if (isExist) {
      return NextResponse.json(
        { message: `${name} is already taken.` },
        { status: 409 }
      )
    }

    const team = await prisma.team.create({
      data: {
        name,
        members: {
          create: {
            user: { connect: { email } },
            role: "admin"
          }
        }
      }
    })
    return NextResponse.json(team, { status: 201 })
  } catch (e) {
    return NextResponse.json(
      { message: "Unable to create team right now. Please try again later." },
      { status: 500 }
    )
  }
}
