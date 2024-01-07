"use client"

import { ButtonHTMLAttributes } from "react"
import { useFormStatus } from "react-dom"

export default function SubmitButton({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus()
  return <button type="submit" aria-disabled={pending} {...props} />
}
