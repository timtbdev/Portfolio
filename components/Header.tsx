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
      className="sticky top-0 z-40 border-y border-gray-800/10 py-3 px-4 opacity-100 backdrop-blur-xl transition-colors duration-500 dark:border-neutral-700/20 sm:py-4 sm:px-6"
    >
      {({ open }) => (
        <>
          <nav
            className="flex items-center justify-between"
            aria-label="Global"
          >
            {/* Logo */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-start">
              <Logo image={profile.image} description={profile.description} />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex flex-1 lg:hidden">
              <MobileMenuButton open={open} />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden gap-x-6 lg:flex">
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
