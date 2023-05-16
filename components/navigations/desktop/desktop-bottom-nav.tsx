import { FC } from "react"

import { Footer } from "types"

interface DesktopBottomNavProps {
  footer: Footer
}
const DesktopBottomNav: FC<DesktopBottomNavProps> = ({ footer }) => {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-2 py-3 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          {footer.socials.map((item, idx) => (
            <a
              key={idx + item.name}
              href={item.href}
              className="text-slate-400 hover:text-slate-500 focus-visible:border-blue-500 dark:text-slate-500 dark:hover:text-slate-400 dark:focus-visible:border-orange-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-4 md:order-1 md:mt-0">
          <p className="text-center text-base text-slate-500 dark:text-slate-400">
            &copy; {footer.copyright}
          </p>
        </div>
      </div>
    </>
  )
}

export default DesktopBottomNav
