import { Disclosure } from "@headlessui/react"

import { cn } from "@libs/utils"

interface Props {
  open: boolean
}

export function MobileMenuButton({ open }: Props) {
  return (
    <>
      <Disclosure.Button
        className={cn(
          "focus-visible-base inline-flex h-10 w-10 items-center justify-center rounded-md bg-white text-gray-500 shadow-sm shadow-gray-400/50 ring-1 ring-gray-200/50 hover:text-gray-900 dark:bg-neutral-700 dark:text-neutral-400 dark:ring-neutral-600"
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
