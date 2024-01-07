"use server"

import { z } from "zod"
import { getServerSession } from "next-auth"

import option from "@/app/api/auth/[...nextauth]/options"
import team from "@/libs/actions/team"
import { revalidatePath } from "next/cache"

const schema = z.object({
  name: z
    .string()
    .refine(data => data.trim() !== "", { message: "Name is required" })
    .refine(data => data.length >= 3 || data.trim() === "", {
      message: "Name must be at least 3 characters long"
    })
})

export async function createTeam(formData: FormData) {
  // get user session data.
  const { user } = await getServerSession(option)

  // validate input.
  const input = schema.safeParse({
    name: formData.get("name")
  })

  if (!input.success) {
    return { message: "Unable to create team. Please try again later." }
  }

  const data = input.data

  try {
    await team.create(data.name, user.email)
    revalidatePath("/")
    return { message: `${data.name} successfully created.` }
  } catch (e) {
    console.log(e)
    return { message: "Unable to create team. Please try again later." }
  }
}
