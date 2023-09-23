// React
import { PropsWithChildren } from "react"

export function ErrorText(props: PropsWithChildren<{}>) {
  return <small className="text-error capitalize font-bold">{props.children}</small>
}