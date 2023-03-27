"use client"

import { Fragment } from "react"
import { usePathname } from "next/navigation"
import { Disclosure } from "@headlessui/react"

import { menu, profile } from "@config/index"
import {
  DarkModeToggle,
  DesktopNavigation,
  Logo,
  MobileMenuButton,
  MobileNavigation,
} from "./navigations/index"

export function Header() {
  const currentPath = usePathname()
  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-40 border-[1.5px] border-y border-slate-300 opacity-100 shadow-sm backdrop-blur-xl transition-colors duration-500 dark:border-slate-400/50 dark:bg-slate-800 dark:shadow-slate-900"
    >
      {({ open }) => (
        <>
          <nav
            className="mx-auto flex max-w-7xl items-center justify-between p-4"
            aria-label="Global"
          >
            {/* Mobile Menu Button */}
            <div className="flex flex-1 justify-start lg:hidden">
              <MobileMenuButton open={open} />
            </div>

            {/* Logo */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-start">
              <Logo image={profile.image} description={profile.description} />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden gap-x-6 lg:flex lg:flex-1">
              <DesktopNavigation path={currentPath} menu={menu} />
            </div>

            {/* Dark Mode Toggle Button */}
            <div className="flex flex-1 justify-end">
              <DarkModeToggle />
            </div>
          </nav>

          {/* <!-- Mobile Navigation --> */}
          <MobileNavigation fragment={Fragment} menu={menu} />
        </>
      )}
    </Disclosure>
  )
}
