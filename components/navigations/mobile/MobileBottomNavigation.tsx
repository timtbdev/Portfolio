import { FC } from "react"
import Link from "next/link"
import { cn } from "@/libs/utils"

import { Menu } from "types"

interface MobileBottomNavigationProps {
  path?: string | null
  menu: Menu[]
}

const MobileBottomNavigation: FC<MobileBottomNavigationProps> = ({
  menu,
  path,
}) => {
  return (
    <>
      <div className="dark:bg-slate-80 sticky bottom-0 left-0 h-16 w-full">
        <div className="mx-auto grid h-full max-w-lg grid-cols-4 font-medium">
          {menu.slice(0, 4).map((item) => (
            <Link
              href={item.url}
              key={item.idx + item.title}
              scroll={true}
              className={cn(
                "group inline-flex flex-col items-center justify-center px-5",
                {
                  "bg-gradient-to-bl from-gray-300 via-gray-200 to-gray-100 dark:bg-gradient-to-t dark:from-slate-700 dark:via-slate-700 dark:to-slate-800":
                    path === item.url,
                }
              )}
            >
              <item.icon
                className={cn(
                  "h-6 w-6",
                  { "text-slate-700 dark:text-slate-300": path === item.url },
                  { "text-slate-600 dark:text-slate-400": path != item.url }
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "font-regular text-base",
                  { "text-slate-700 dark:text-slate-300": path === item.url },
                  { "text-slate-600 dark:text-slate-400": path != item.url }
                )}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default MobileBottomNavigation
