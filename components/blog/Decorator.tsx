import { FC, ReactNode } from "react"
import { cn } from "@/libs/utils"

interface DecoratorProps {
  children: ReactNode
  className?: string
}

const Decorator: FC<DecoratorProps> = ({ children, className = "" }) => {
  return (
    <>
      <span
        className={cn(
          "line-through decoration-blue-500 dark:decoration-sky-500",
          className
        )}
      >
        {children}
      </span>
    </>
  )
}

export default Decorator
