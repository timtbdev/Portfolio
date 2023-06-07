import { FC } from "react"
import Link from "next/link"
import { cn } from "@/libs/utils"
import { DBNavItem } from "@/types"

interface DesktopNavProps {
  dbNavigations: DBNavItem[]
  currentPath: string
}

const DesktopNav: FC<DesktopNavProps> = ({ dbNavigations, currentPath }) => {
  return (
    <>
      <div className="hidden lg:ml-6 lg:block">
        <div className="flex space-x-4">
          {dbNavigations.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium",
                {
                  "bg-gray-900 text-white":
                    currentPath === item.href ||
                    currentPath.split("/", 3).at(2) ===
                      item.href.split("/", 3).at(2),
                },
                {
                  "text-gray-300 hover:bg-gray-700 hover:text-white":
                    currentPath != item.href,
                }
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default DesktopNav
