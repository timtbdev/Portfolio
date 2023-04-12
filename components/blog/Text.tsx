import { FC, ReactNode } from "react"
import { cn } from "@/libs/utils"

interface TextProps {
  children: ReactNode
  className?: string
}

const Text: FC<TextProps> = ({ children, className = "" }) => {
  return (
    <>
      <p
        className={cn(
          "mx-auto text-lg leading-8 text-slate-600 dark:text-slate-500",
          className
        )}
      >
        {children}
      </p>
    </>
  )
}

export default Text
