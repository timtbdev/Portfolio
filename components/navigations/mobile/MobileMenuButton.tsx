import { FC } from "react"
import { Disclosure } from "@headlessui/react"

import { cn } from "@libs/utils"

interface MobileMenuButtonProps {
  open: boolean
}

const MobileMenuButton: FC<MobileMenuButtonProps> = ({ open }) => {
  return (
    <>
      <Disclosure.Button
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-slate-600 shadow-md shadow-slate-500/40 ring-[1.5px] ring-slate-500/40 hover:bg-gray-100 hover:shadow-md hover:shadow-slate-500 hover:ring-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:ring-orange-500 dark:bg-slate-700 dark:text-slate-200 dark:shadow-slate-900 dark:ring-slate-500 dark:hover:bg-slate-700 dark:hover:ring-sky-500 dark:focus-visible:ring-orange-500"
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
