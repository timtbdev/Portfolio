import { FC } from "react"

import { Menu } from "types"

interface MobileBottomNavigationProps {
  menu: Menu[]
}

const MobileBottomNavigation: FC<MobileBottomNavigationProps> = ({ menu }) => {
  return (
    <>
      <div className="sticky bottom-0 left-0 z-40 h-16 w-full border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto grid h-full max-w-lg grid-cols-4 font-medium">
          {menu.slice(0, 4).map((item) => (
            <button
              key={item.idx + item.title}
              type="button"
              className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <item.icon
                className="h-6 w-6 text-slate-600 dark:text-slate-200"
                aria-hidden="true"
              />
              <span className="font-regular text-base text-slate-600 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default MobileBottomNavigation
