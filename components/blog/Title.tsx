import { FC, ReactNode } from "react"
import { cn } from "@/libs/utils"

interface TitleProps {
  children: ReactNode
  className?: string
}

const Title: FC<TitleProps> = ({ children, className = "" }) => {
  return (
    <>
      <span
        className={cn(
          "block font-calsans text-4xl tracking-tight text-slate-900 dark:text-slate-100",
          className
        )}
      >
        {children}
      </span>
    </>
  )
}

export default Title
