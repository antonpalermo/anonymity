"use client"

import { useFormState, useFormStatus } from "react-dom"

import { createTeam } from "@/utils/actions/team"
import { useState } from "react"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"

function Submit() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>
      Create
    </button>
  )
}

export default function CreateForm() {
  const [error, setError] = useState("")

  async function handler(formData: FormData) {
    const result = await createTeam(formData)

    if (result.error) {
      const error = result.error

      if (error.type === "server") {
        toast.error(error.message)
      } else {
        setError(error.message)
      }
    } else {
      toast.success(result.message)
      redirect("/")
    }
  }

  return (
    <form action={handler}>
      <input type="text" name="name" placeholder="Name" />
      <Submit />
      {error}
    </form>
  )
}
