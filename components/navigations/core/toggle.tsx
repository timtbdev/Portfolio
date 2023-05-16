"use client"

import { FC, useEffect, useState } from "react"
import { cn } from "@/libs/utils"
import { Switch } from "@headlessui/react"
import { useTheme } from "next-themes"

const Toggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="relative flex items-center space-x-4">
      <Switch
        onChange={changeTheme}
        checked={theme === "dark" ? true : false}
        className="relative inline-flex items-center rounded-full bg-gradient-to-t from-gray-100 via-gray-50 to-white px-2 py-1.5 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-100 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20 dark:bg-gradient-to-t dark:from-slate-600 dark:via-slate-700 dark:to-slate-800 dark:ring-white/10 dark:hover:bg-gradient-to-br dark:hover:from-slate-800 dark:hover:via-slate-700 dark:hover:to-slate-600 dark:active:ring-white/20"
      >
        <span className="sr-only">Disable dark mode</span>
        <svg
          width="24"
          height="24"
          fill="none"
          aria-hidden="true"
          className={cn(
            "text-gray-400 transition-transform duration-500",
            { "scale-100": theme === "dark" },
            { "scale-0": theme === "light" }
          )}
        >
          <path
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12 4v1M18 6l-1 1M20 12h-1M18 18l-1-1M12 19v1M7 17l-1 1M5 12H4M7 7 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>

        <svg
          width="24"
          height="24"
          fill="none"
          aria-hidden="true"
          className={cn(
            "ml-3.5 text-gray-400 transition-transform duration-500",
            { "scale-0": theme === "dark" },
            { "scale-100": theme === "light" }
          )}
        >
          <path
            d="M18 15.63c-.977.52-1.945.481-3.13.481A6.981 6.981 0 0 1 7.89 9.13c0-1.185-.04-2.153.481-3.13C6.166 7.174 5 9.347 5 12.018A6.981 6.981 0 0 0 11.982 19c2.67 0 4.844-1.166 6.018-3.37ZM16 5c0 2.08-.96 4-3 4 2.04 0 3 .92 3 3 0-2.08.96-3 3-3-2.04 0-3-1.92-3-4Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <span
          className={cn(
            "absolute left-0.5 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 shadow-sm shadow-black/5 ring-1 ring-black/10 transition duration-500 dark:bg-slate-300 dark:shadow-slate-900 dark:ring-black/10",
            { "translate-x-[2.625rem]": theme === "dark" }
          )}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            aria-hidden="true"
            className={cn(
              "flex-none text-gray-500 transition duration-300",
              { "scale-0 opacity-0": theme === "dark" },
              { "scale-100 opacity-100": theme === "light" }
            )}
          >
            <path
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12 4v1M18 6l-1 1M20 12h-1M18 18l-1-1M12 19v1M7 17l-1 1M5 12H4M7 7 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <svg
            width="24"
            height="24"
            fill="none"
            aria-hidden="true"
            className={cn(
              "-ml-6 flex-none text-gray-600 transition duration-500",
              { "scale-100 opacity-100": theme === "dark" },
              { "scale-0 opacity-0": theme === "light" }
            )}
          >
            <path
              d="M18 15.63c-.977.52-1.945.481-3.13.481A6.981 6.981 0 0 1 7.89 9.13c0-1.185-.04-2.153.481-3.13C6.166 7.174 5 9.347 5 12.018A6.981 6.981 0 0 0 11.982 19c2.67 0 4.844-1.166 6.018-3.37ZM16 5c0 2.08-.96 4-3 4 2.04 0 3 .92 3 3 0-2.08.96-3 3-3-2.04 0-3-1.92-3-4Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>
      </Switch>
    </div>
  )
}

export default Toggle
