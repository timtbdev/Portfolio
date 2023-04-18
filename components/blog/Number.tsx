import { FC } from "react"
import { cn } from "@/libs/utils"

interface NumberProps {
  number: number
  className?: string
}

const Number: FC<NumberProps> = ({ number, className = "" }) => {
  return (
    <>
      <div
        className={cn(
          "mx-auto flex h-10 w-40 items-center justify-center rounded-xl bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 align-middle text-lg font-bold uppercase text-slate-600 shadow-md shadow-black/5 ring-1 ring-black/10 dark:bg-slate-700/50 dark:from-slate-700/30 dark:via-slate-700 dark:to-slate-800 dark:text-slate-400 dark:ring-slate-400/40",
          className
        )}
      >
        <span>{number}</span>
      </div>
    </>
  )
}

export default Number
