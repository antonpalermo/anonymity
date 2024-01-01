"use client"

import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"

import { InputFields } from "@/libs/schema/teamSchema"
import { useSession } from "next-auth/react"

export default function CreateForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<InputFields>()
  const router = useRouter()
  const { update } = useSession()

  const submit: SubmitHandler<InputFields> = async data => {
    const request = await fetch("/api/team/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    if (!request.ok) {
      const response = await request.json()
      response.errors.map(e =>
        setError(e.name, { type: "manual", message: e.message })
      )
    }

    const { id } = await request.json()
    update({ role: "admin" })
    router.push(`/${id}`)
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
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
