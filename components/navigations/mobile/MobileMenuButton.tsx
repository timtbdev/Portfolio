import { FC } from "react"
import { cn } from "@/libs/utils"
import { Disclosure } from "@headlessui/react"

interface MobileMenuButtonProps {
  open: boolean
}

const MobileMenuButton: FC<MobileMenuButtonProps> = ({ open }) => {
  return (
    <>
      <Disclosure.Button
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-t from-gray-100 via-gray-50 to-white text-gray-500 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-100 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20 dark:bg-gradient-to-tl dark:from-slate-600 dark:via-slate-700 dark:to-slate-800 dark:text-slate-400 dark:ring-white/10 dark:hover:bg-gradient-to-tr dark:hover:from-slate-800 dark:hover:via-slate-700 dark:hover:to-slate-700 dark:active:ring-white/20"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute block h-0.5 w-5 bg-current transition-transform duration-500 ease-in-out",
            { "rotate-45": open },
            { "-translate-y-1.5": !open }
          )}
        ></span>
        <span
          aria-hidden="true"
          className={cn(
            "absolute block  h-0.5 w-5 bg-current transition-transform duration-500 ease-in-out",
            { "opacity-0": open }
          )}
        ></span>
        <span
          aria-hidden="true"
          className={cn(
            "absolute block  h-0.5 w-5 bg-current  transition-transform duration-500 ease-in-out",
            { "-rotate-45": open },
            { "translate-y-1.5": !open }
          )}
        ></span>
      </Disclosure.Button>
    </>
  )
}

export default MobileMenuButton
