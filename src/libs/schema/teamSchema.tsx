import { z } from "zod"

export const teamSchema = z.object({
  name: z
    .string()
    .refine(data => data.trim() !== "", { message: "Name is required" })
    .refine(data => data.length >= 3 || data.trim() === "", {
      message: "Name must be at least 3 characters long"
    })
})

export type InputFields = z.infer<typeof teamSchema>
