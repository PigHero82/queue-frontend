// React
import { DetailedHTMLProps, InputHTMLAttributes } from "react"

interface Type extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string
  error?: string
}

export function Input(props: Type) {
  return (
    <section className="w-full">
      {props.label && (
        <label className="label">
          <span className={`label-text font-bold ${props.error && "text-error"}`}>{props.label}</span>
        </label>
      )}

      <input {...props} className={`input input-bordered w-full ${props.error && "input-error"}`} />

      {props.error && (
        <label className="label">
          <span className={`label-text-alt font-bold ${props.error && "text-error"}`}>{props.error}</span>
        </label>
      )}
    </section>
  )
}