"use server"

import { z } from "zod"
import { Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"

import prisma from "@/utils/prisma"
import option from "@/app/api/auth/[...nextauth]/options"

const schema = z.object({
  name: z
    .string()
    .refine(data => data.trim() !== "", { message: "Name is required" })
    .refine(data => data.length >= 3 || data.trim() === "", {
      message: "Name must be at least 3 characters long"
    })
})

export async function createTeam(formData: FormData) {
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
  // check the provided input
  const parsed = schema.safeParse({
    name: formData.get("name")
  })

  // if not successful then return the error.
  if (!parsed.success) {
    return {
      error: {
        type: "validation",
        message: parsed.error.errors.map(err => err.message)[0]
      }
    }
  }

  const data = parsed.data
  const user = session.user

  try {
    await prisma.team.create({
      data: {
        name: data.name,
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
  } catch (e) {
    // specific error codes returned for unique key constrains
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          error: {
            type: "validation",
            message: `${data.name} is already taken`
          }
        }
      }
    }

    return {
      error: {
        type: "server",
        message: "Unable to create team. Please try again later."
      }
    }
  }

  return { message: `${data.name} successfuly created.` }
}
