import { JSONContent } from "@tiptap/react"

import prisma from "@/utils/prisma"
import errors from "@/utils/errors"

type Error = {
  error: { type: "server" | "validation"; message: string }
}

async function createIncident(
  heading: string,
  contents: JSONContent
): Promise<{ message: string } | Error> {
  try {
    await prisma.incident.create({
      data: { heading, contents, reporter: "sample" }
    })
    return Promise.resolve({ message: "Successfully Created" })
  } catch (error) {
    return Promise.reject({
      error: { type: "server", message: errors.SERVER_ERROR }
    })
  }
}

export { createIncident }
