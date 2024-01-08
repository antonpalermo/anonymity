"use client"

import { useFormState, useFormStatus } from "react-dom"

const initialState = {
  name: ""
}

function Submit() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>
      Create
    </button>
  )
}

export default function CreateForm({
  action
}: {
  action: (prevState: { name: "" }, formData: FormData) => any
}) {
  const [state, formAction] = useFormState(action, initialState)

  return (
    <>
      <form action={formAction}>
        <input type="text" name="name" placeholder="Name" />
        <Submit />
      </form>
      {state?.error && <span>{JSON.stringify(state.error)}</span>}
    </>
  )
}
