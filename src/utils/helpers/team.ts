import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"

import errors from "../errors"
import prisma from "../prisma"

import option from "@/app/api/auth/[...nextauth]/options"

type Team = Prisma.TeamGetPayload<{
  include: {
    members: {
      select: {
        user: { select: { name: true; email: true; image: true } }
        role: true
      }
    }
  }
}>

type Error = {
  error: { type: "server" | "validation"; message: string }
}

/**
 * get and return the room details where in user is in.
 * @returns a room where the currently logged in user is on.
 */
async function getTeam(): Promise<Team | Error | undefined> {
  // get server session
  const session = await getServerSession(option)
  // check if session is valid if not return an error
  if (!session) {
    return {
      error: {
        type: "server",
        message: "You must be signed in to perform this action!"
      }
    }
  }

  const user = session.user

  try {
    const team = await prisma.team.findFirst({
      where: { members: { every: { user: { email: user.email } } } },
      include: {
        members: {
          select: {
            user: { select: { name: true, email: true, image: true } },
            role: true
          }
        }
      }
    })

    if (!team) {
      return undefined
    }

    return Promise.resolve(team)
  } catch (error) {
    // TODO: add logger here.
    return { error: { type: "server", message: errors.SERVER_ERROR } }
  }
}

/**
 * creates a new team.
 * @param name name of the team to be created.
 * @returns created team.
 */
async function createTeam(name: string): Promise<Team | Error> {
  // get server session
  const session = await getServerSession(option)
  // check if session is valid if not return an error
  if (!session) {
    return {
      error: {
        type: "server",
        message: "You must be signed in to perform this action!"
      }
    }
  }

  const user = session.user

  try {
    const team = await prisma.team.create({
      data: {
        name: name,
        members: {
          create: {
            user: { connect: { email: user.email! } },
            role: "admin"
          }
        }
      },
      // include members in the result.
      include: {
        members: {
          select: {
            user: { select: { name: true, email: true, image: true } },
            role: true
          }
        }
      }
    })

    return Promise.resolve(team)
  } catch (e) {
    // specific error codes returned for unique key constrains
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return Promise.reject({
          error: {
            type: "validation",
            message: `${name} is already taken`
          }
        })
      }
    }

    return Promise.reject({
      error: {
        type: "server",
        message: errors.SERVER_ERROR
      }
    })
  }
}

export default { getTeam, createTeam }
