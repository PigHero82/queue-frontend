// Components
import { FormSection } from "./components"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="my-auto mx-auto prose">
        <h1 className="text-center">Join Queue</h1>
        <FormSection />
      </div>
    </div>
  )
}