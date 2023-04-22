import { FC } from "react"
import { cn } from "@/libs/utils"

interface SeperatorProps {
  className: string
  variant?: "gradient" | "solid" | "gradient-from-lr"
}

const Seperator: FC<SeperatorProps> = ({ className, variant = "solid" }) => {
  return (
    <>
      <div
        className={cn(
          "mt-8 h-[1.5px] w-full  opacity-80 sm:mt-5",
          className,
          {
            "bg-gradient-to-r from-black/10 via-black/5 to-white dark:from-white/20 dark:via-white/10 dark:to-slate-800":
              variant === "gradient",
          },
          { "bg-black/5 dark:bg-white/10": variant === "solid" },
          {
            "bg-gradient-to-r from-white via-black/5 to-white dark:from-slate-800 dark:via-white/10 dark:to-slate-800":
              variant === "gradient-from-lr",
          }
        )}
      ></div>
    </>
  )
}

export default Seperator
