// React
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

interface Type extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  color?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
  isloading?: boolean
  isoutline?: boolean
}

export function Button(props: Type) {
  // Variables
  const color = {
    neutral: "btn-neutral",
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    info: "btn-info",
    success: "btn-success",
    warning: "btn-warning",
    error: "btn-error"
  }

  return (
    <button {...props} className={`btn ${props.color && color[props.color]} ${props.isoutline && "btn-outline"} ${props.className}`} disabled={props.isloading ?? props.disabled}>
      {props.isloading && <span className="loading loading-spinner" />}
      {props.children}
    </button>
  )
}