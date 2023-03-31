import { usePathname } from "next/navigation"

import { footer, menu } from "../config"
import { BottomNavigation, MobileBottomNavigation } from "./navigations"

const Footer = () => {
  const currentPath = usePathname()
  return (
    <>
      <footer className="sticky bottom-0 z-40 border-y-[1.2px] border-slate-300 bg-gray-50 shadow-t-sm dark:border-slate-600/50 dark:bg-slate-800 dark:shadow-slate-900">
        <nav
          className="mx-auto hidden max-w-7xl items-center justify-between px-4 md:flex"
          aria-label="Global"
        >
          <BottomNavigation footer={footer} />
        </nav>
        <nav
          className="mx-auto max-w-7xl items-center justify-between px-4 md:hidden"
          aria-label="Global"
        >
          <MobileBottomNavigation menu={menu} path={currentPath} />
        </nav>
      </footer>
    </>
  )
}

export default Footer
