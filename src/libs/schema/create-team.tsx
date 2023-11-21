import { z } from "zod"

export const createTeamSchema = z.object({
  name: z
    .string({ required_error: "Team name is required" })
    .min(8, { message: "Team name should be 8 minimum of characters." })
})

export type InputFields = z.infer<typeof createTeamSchema>
