import { FC } from "react"
import Link from "next/link"

import { Menu } from "types"
import { cn } from "@libs/utils"


interface MobileBottomNavigationProps {
  path?: string
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
              className={cn(
                "group inline-flex flex-col items-center justify-center px-5",
                { "bg-orange-100 dark:bg-sky-100": path === item.url }
              )}
            >
              <item.icon
                className={cn(
                  "h-6 w-6",
                  { "text-orange-500 dark:text-sky-500": path === item.url },
                  { "text-slate-600 dark:text-slate-200": path != item.url }
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "font-regular text-base",
                  { "text-orange-500 dark:text-sky-500": path === item.url },
                  { "text-slate-600 dark:text-slate-200": path != item.url }
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
