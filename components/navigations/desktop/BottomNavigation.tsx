import { FC, useState } from "react"
import { Transition } from "@headlessui/react"

import { Footer } from "types"

interface BottomNavigationProps {
  footer: Footer
}
const BottomNavigation: FC<BottomNavigationProps> = ({ footer }) => {
  const [isShowing, setIsShowing] = useState(false)
  return (
    <>
      <div className="sticky bottom-0 left-0 border-t-[1.5px] border-slate-300/50 bg-gray-50 shadow-t-sm dark:border-slate-600/50 dark:bg-slate-800 dark:shadow-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
          <div className="order-2 flex justify-center space-x-6">
            {footer.socials.map((item, idx) => (
              <a
                key={idx + item.name}
                href={item.href}
                className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="order-1 mt-0">
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              &copy; {footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default BottomNavigation
