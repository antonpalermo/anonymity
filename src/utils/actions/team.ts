"use server"

import { z } from "zod"

import team from "@/utils/helpers/team"

const schema = z.object({
  name: z
    .string()
    .refine(data => data.trim() !== "", { message: "Name is required" })
    .refine(data => data.length >= 3 || data.trim() === "", {
      message: "Name must be at least 3 characters long"
    })
})

export async function createTeam(formData: FormData) {
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

  try {
    await team.createTeam(data.name)
  } catch (error) {
    return { error: { type: "server", message: "unable to create team" } }
  }

  return { message: `${data.name} successfuly created.` }
}
