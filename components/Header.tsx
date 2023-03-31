"use client"

import { Fragment } from "react"
import { usePathname } from "next/navigation"
import { Disclosure } from "@headlessui/react"

import { menu, profile } from "@config/index"
import {
  Logo,
  MobileMenuButton,
  MobileNavigation,
  Navigation,
  Switch,
} from "./navigations"

const variants = {
  visible: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: -75 },
  hidden: { opacity: 0, y: -25 },
}

const Header = () => {
  const currentPath = usePathname()

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-40 border-y-[1.5px] border-slate-300 bg-gray-50/30 shadow-sm backdrop-blur-lg duration-500 dark:border-slate-600/50 dark:bg-slate-800 dark:shadow-slate-900"
    >
      {({ open }) => (
        <>
          <nav
            className="mx-auto flex max-w-7xl items-center justify-between p-4"
            aria-label="Global"
          >
            {/* Mobile Menu */}
            <div className="flex flex-1 justify-start md:hidden">
              <MobileMenuButton open={open} />
            </div>

            {/* Logo */}
            <div className="hidden md:flex md:flex-1 md:justify-start">
              <Logo image={profile.image} description={profile.description} />
            </div>

            {/* Navigation */}
            <div className="hidden gap-x-6 sm:flex sm:flex-1">
              <Navigation path={currentPath} menu={menu} />
            </div>

            {/* Dark Mode */}
            <div className="flex flex-1 justify-end">
              <Switch />
            </div>
          </nav>
          {/* <!-- Mobile Navigation --> */}
          <MobileNavigation fragment={Fragment} menu={menu} />
        </>
      )}
    </Disclosure>
  )
}

export default Header
