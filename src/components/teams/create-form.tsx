"use client"

import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"

import { InputFields } from "@/libs/schema/teamSchema"
import { useSession } from "next-auth/react"
import { useState } from "react"

export default function CreateForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<InputFields>()
  const router = useRouter()
  const { update } = useSession()

  const [error, setFormError] = useState("")

  const submit: SubmitHandler<InputFields> = async data => {
    // clear form error
    setFormError("")
    // send the request
    const request = await fetch("/api/team/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const response = await request.json()

    if (request.ok) {
      await update({ role: "admin", team: { id: response.id } })
      router.push(`/${response.id}`)
    }

    // check if the request is invalid
    if (!request.ok && request.status === 400) {
      response.errors.map(e =>
        setError(e.name, { type: "manual", message: e.message })
      )
    }

    return setFormError(response.message)
  }

  return (
    <div>
      <h1>New Team</h1>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="team-name">Name</label>
          <input
            type="text"
            name="team-name"
            id="team-name"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
        {error}
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
