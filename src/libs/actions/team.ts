import { redirect } from "next/navigation"

import prisma from "@/db/prisma"

/**
 * get user's assigned team.
 * @param email email address of the member
 */
async function find(email: string) {
  const team = await prisma.team.findFirst({
    where: { members: { some: { user: { email } } } },
    include: { members: { select: { role: true, user: true } } }
  })

  if (!team) {
    redirect(`/team/create`)
  }

  return team
}

export default { find }
