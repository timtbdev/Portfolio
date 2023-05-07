import { FC, ReactNode } from "react"
import { cn } from "@/libs/utils"

interface ContainerProps {
  children: ReactNode
  className?: string
}

const Container: FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <>
      <div className={cn("mx-auto max-w-7xl", className)}>{children}</div>
    </>
  )
}

export default Container
