import { Prisma } from "@prisma/client"
import { redirect } from "next/navigation"

import prisma from "@/db/prisma"

/**
 * get user's assigned team.
 * @param email email address of the member
 */
async function find(email: string) {
  // team data
  let team: Prisma.TeamGetPayload<{
    include: { members: { select: { role: true; user: true } } }
  }>

  try {
    // find the first team and assign it to team variable.
    team = await prisma.team.findFirst({
      where: { members: { some: { user: { email } } } },
      include: { members: { select: { role: true, user: true } } }
    })
  } catch (e) {
    // console log the error.
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log({ code: e.code, message: e.message })
    }
  }

  if (!team) {
    // if there's no team available redirect them to
    // create team page.
    redirect(`/team/create`)
  }
  // return the team data if exists.
  return team
}

async function create(name: string, admin: string) {
  // team data
  let team: Prisma.TeamGetPayload<{
    include: { members: { select: { role: true; user: true } } }
  }>

  try {
    team = await prisma.team.create({
      data: {
        name,
        members: {
          create: { user: { connect: { email: admin } }, role: "admin" }
        }
      },
      include: { members: { select: { role: true, user: true } } }
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return { message: `${name} is already taken` }
      }
    }
  }

  return create
}

export default { find, create }
