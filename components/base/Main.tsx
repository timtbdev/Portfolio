import { FC, ReactNode } from "react"
import { cn } from "@/libs/utils"

interface MainProps {
  children: ReactNode
  className?: string
}

const Main: FC<MainProps> = ({ children, className = "" }) => {
  return (
    <>
      <div
        className={cn(
          "relative isolate mx-auto max-w-5xl py-10 sm:py-12",
          className
        )}
      >
        {children}
      </div>
    </>
  )
}

export default Main
