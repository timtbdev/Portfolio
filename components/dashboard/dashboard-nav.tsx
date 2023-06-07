"use client"

import { FC } from "react"
import { usePathname } from "next/navigation"
import { dbNavigations } from "@/config"
import { Disclosure } from "@headlessui/react"

import { User } from "types"
import { Logo, Search } from "./navigation/core"
import { DesktopNav, ProfileMenu } from "./navigation/desktop/"
import { MobileMenuButton, MobileNav } from "./navigation/mobile/"

interface DashBoardNavProps {
  id: string
  name: string
  email: string
  image: string
}

const DashBoardNav: FC<DashBoardNavProps> = ({ id, name, email, image }) => {
  const currentPath = usePathname()
  const user: User = { id, name, email, image }
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-5xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                {/* Logo */}
                <Logo />
                {/* Desktop Navigation */}
                <DesktopNav
                  dbNavigations={dbNavigations}
                  currentPath={currentPath || ""}
                />
              </div>
              {/* Search bar */}
              <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                <Search />
              </div>
              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <MobileMenuButton open={open} />
              </div>
              {/* Profile dropdown menu */}
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center">
                  <ProfileMenu user={user} />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <MobileNav
            dbNavigations={dbNavigations}
            currentPath={currentPath || ""}
            user={user}
          />
        </>
      )}
    </Disclosure>
  )
}

export default DashBoardNav
