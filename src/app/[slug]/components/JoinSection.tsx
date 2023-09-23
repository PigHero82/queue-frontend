"use client"

// Components
import { Button, Input } from "@/components"

// Form
import * as yup from "yup"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

export function JoinSection(props: {
  onJoined: () => void
}) {
  // Form
  type Form = {
    name: string
    phone: string
    email: string
  }
  const defaultValues = {
    name: "",
    phone: "",
    email: ""
  }
  const validationSchema = yup.object().shape({
    name: yup.string().label("Queue").required(),
    phone: yup.string().label("Phone").matches(/^[0-9]*$/, "Phone only accept number only").required(),
    email: yup.string().email().label("Email").required()
  })
  const onSubmit = props.onJoined
  const { control, formState, handleSubmit } = useForm<Form>({
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-3 w-full">
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => <Input {...field} placeholder="Name" className="w-full" error={fieldState.error?.message} />}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field, fieldState }) => <Input {...field} type="number" placeholder="Phone" className="w-full" error={fieldState.error?.message} />}
      />

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => <Input {...field} type="email" placeholder="Email" className="w-full" error={fieldState.error?.message} />}
      />

      <Button type="submit" className="w-full" isloading={formState.isSubmitting}>Join</Button>
    </form>
  )
}