"use client"

// React
import { useEffect, useState } from "react"

// API
import { services } from "@/services"

// Components
import { Button, ErrorText } from "@/components"

// Form
import * as yup from "yup"
import { Controller, useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { yupResolver } from "@hookform/resolvers/yup"

// Third-Party Libraries
import toast from "react-hot-toast"

// Types
import { ErrorFetch, SuccessFetch } from "@/types"

export function FormSection() {
  // Form
  type Form = {
    queue: string
  }
  const defaultValues = {
    queue: ""
  }
  const validationSchema = yup.object().shape({
    queue: yup.string().label("Queue").required()
  })
  const onSubmit = (value: Form) => {
    return new Promise<void>((resolve) => {
      toast.promise(
        services.post("/check-queue", value),
        {
          loading: "Loading...",
          error: (err: ErrorFetch) => err.response.data.message,
          success: (res: SuccessFetch<{ data: string }>) => {
            console.log(res.data)
            return res.data.data
          }
        }
      ).catch(() => {}).finally(resolve)
    })
  }
  const { control, formState, handleSubmit } = useForm<Form>({
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-3">
      <div className="form-control">
        <Controller
          control={control}
          name="queue"
          render={({ field, fieldState }) => (
            <label className={`input-group ${fieldState.error && "border-2 border-error rounded-lg"}`}>
              <span>
                <Pathname />
              </span>

              <input {...field} type="text" ref={null} placeholder="Queue Code" className="input input-bordered" />
            </label>
          )}
        />

        <ErrorMessage errors={formState.errors} name="queue" render={({ message }) => <ErrorText>{message}</ErrorText>} />
      </div>

      <Button type="submit" className="w-full" isloading={formState.isSubmitting ? true : undefined}>Join</Button>
    </form>
  )
}

function Pathname() {
  // Hooks
  const [pathname, setPathname] = useState("")

  useEffect(() => {
    setPathname(window.location.href)
  }, [])

  return pathname
}