import { FC } from "react"
import { ArrowIcon } from "@/icons"
import { cn } from "@/libs/utils"

interface LinkProps {
  title: string
  href: string
  className?: string
}

const Link: FC<LinkProps> = ({ title, href, className = "" }) => {
  return (
    <>
      <button
        type="button"
        className={cn(
          "group whitespace-nowrap rounded-lg bg-gray-100 px-4 py-1.5 font-mono font-medium text-slate-600 shadow-sm shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:ring-slate-600 dark:bg-slate-700/30 dark:text-slate-300 dark:ring-white/20 dark:hover:ring-slate-300",
          className
        )}
      >
        <a target="_blank" href={href}>
          <div className="inline-flex items-center space-x-1 text-sm">
            <span>{title}</span>
            <ArrowIcon className="h-4 w-4 rounded bg-none text-blue-500 transition-all dark:text-sky-500" />
          </div>
        </a>
      </button>
    </>
  )
}

export default Link
