import { FC, useState } from "react"
import Link from "next/link"
import { cn } from "@/libs/utils"
import { Menu } from "@/types"

interface DesktopNavProps {
  currentPath: string
  menu: Menu[]
}

const DesktopNav: FC<DesktopNavProps> = ({ currentPath, menu }) => {
  return (
    <>
      <div className="hidden gap-x-6 md:flex">
        {menu.map(({ url, title, idx }) => (
          <Link
            href={url}
            key={idx}
            className={cn(
              "relative inline-flex items-center rounded-full px-4 py-1 text-base font-medium text-gray-600 ring-1 ring-transparent transition duration-200 active:scale-[96%] active:ring-black/20 dark:text-slate-400 dark:active:ring-white/20",
              {
                "bg-gradient-to-t from-gray-100 via-gray-50 to-gray-50 px-4 shadow-md shadow-black/5 ring-1 ring-black/10 dark:bg-gradient-to-t dark:from-slate-700 dark:via-slate-700 dark:to-slate-800 dark:ring-white/10":
                  currentPath === url,
              },
              {
                "hover:dark:ring-white/1 bg-transparent ring-transparent hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 hover:shadow-md hover:shadow-black/5 hover:ring-1 hover:ring-black/10 hover:dark:bg-gradient-to-tl hover:dark:from-slate-700 hover:dark:via-slate-700 hover:dark:to-slate-800":
                  currentPath !== url,
              }
            )}
          >
            <div className="relative">{title}</div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default DesktopNav
