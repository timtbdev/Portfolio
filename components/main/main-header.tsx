"use client"

import { Fragment } from "react"
import { usePathname } from "next/navigation"
import { Logo, Toggle } from "@/components/navigations/core"
import { DesktopNav } from "@/components/navigations/desktop"
import { MobileMenuButton, MobileNav } from "@/components/navigations/mobile"
import { menu } from "@/config"
import { Disclosure } from "@headlessui/react"

const MainHeader = () => {
  const currentPath = usePathname()

  return (
    <div className="border-y-1 sticky top-0 z-50 border-black/5 bg-gray-50 shadow-sm shadow-gray-300 dark:border-white/10 dark:bg-slate-800 dark:shadow-slate-900/60">
      <Disclosure>
        {({ open }) => (
          <>
            <nav className="mx-auto flex max-w-5xl items-center justify-between px-2 py-4">
              {/* Logo */}
              <div className="flex flex-1 justify-start pl-2">
                <Logo />
              </div>

              {/* Navigation */}
              <div>
                <div className="hidden gap-x-6 sm:flex sm:flex-1">
                  <DesktopNav currentPath={currentPath || ""} menu={menu} />
                </div>
              </div>

              {/* Dark Mode */}
              <div className="hidden justify-end md:flex md:flex-1">
                <Toggle />
              </div>
              {/* Mobile Menu */}
              <div className="flex flex-1 justify-end pr-2 md:hidden">
                <MobileMenuButton open={open} />
              </div>
            </nav>

            {/* <!-- Mobile Navigation --> */}
            <MobileNav fragment={Fragment} menu={menu} />
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default MainHeader
