"use client"

import { usePathname } from "next/navigation"

import { footer, menu } from "../../config"
import { BottomNavigation, MobileBottomNavigation } from "../navigations"

const variants = {
  visible: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: 75 },
  hidden: { opacity: 0, y: 25 },
}

const Footer = () => {
  const currentPath = usePathname()

  return (
    <>
      <footer className="sticky bottom-0 z-40 border-y-[1.2px] border-slate-300 bg-gray-50 shadow-t-sm dark:border-slate-600/50 dark:bg-slate-800 dark:shadow-slate-900">
        <nav className="mx-auto hidden max-w-5xl items-center justify-between md:flex">
          <BottomNavigation footer={footer} />
        </nav>
        <nav className="mx-auto max-w-5xl items-center justify-between md:hidden">
          <MobileBottomNavigation menu={menu} path={currentPath} />
        </nav>
      </footer>
    </>
  )
}

export default Footer
