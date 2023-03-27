import { Disclosure } from "@headlessui/react"

import { cn } from "@libs/utils"

interface Props {
  open: boolean
}

export function MobileMenu({ open }: Props) {
  return (
    <>
      <Disclosure.Button
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-md bg-white text-slate-600 shadow-md ring-[1.5px] ring-slate-400/40 transition-all hover:bg-gray-100 hover:shadow-md hover:shadow-blue-300/50 hover:ring-2 hover:ring-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:bg-slate-700 dark:text-slate-200 dark:shadow-slate-900 dark:ring-slate-400/40 dark:hover:bg-slate-600 dark:hover:ring-sky-500 dark:focus-visible:ring-orange-500"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute block h-0.5 w-5 bg-current transition duration-500 ease-in-out",
            { "rotate-45": open },
            { "-translate-y-1.5": !open }
          )}
        ></span>
        <span
          aria-hidden="true"
          className={cn(
            "absolute block  h-0.5 w-5 bg-current transition duration-500 ease-in-out",
            { "opacity-0": open }
          )}
        ></span>
        <span
          aria-hidden="true"
          className={cn(
            "absolute block  h-0.5 w-5 bg-current  transition duration-500 ease-in-out",
            { "-rotate-45": open },
            { "translate-y-1.5": !open }
          )}
        ></span>
      </Disclosure.Button>
    </>
  )
}
