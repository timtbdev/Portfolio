import { FC, ReactNode } from "react"
import { cn } from "@/libs/utils"

interface ProjectContainerProps {
  children: ReactNode
  className?: string
}

const ProjectContainer: FC<ProjectContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <>
      <div
        className={cn(
          "relative px-6 py-4 sm:px-10 sm:py-6 lg:grid lg:grid-cols-2 ",
          className
        )}
      >
        {children}
      </div>
    </>
  )
}

export default ProjectContainer
