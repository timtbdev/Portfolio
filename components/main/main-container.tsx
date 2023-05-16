import { FC, ReactNode } from "react"
import { cn } from "@/libs/utils"

interface MainContainerProps {
  children: ReactNode
  className?: string
}

const MainContainer: FC<MainContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <>
      <div className={cn("mx-auto max-w-7xl", className)}>{children}</div>
    </>
  )
}

export default MainContainer
