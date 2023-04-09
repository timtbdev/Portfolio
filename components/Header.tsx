"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import useScroll from "@/hooks/useScroll"
import { Disclosure } from "@headlessui/react"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import { motion } from "framer-motion"

import { menu, profile } from "@config/index"
import {
  Logo,
  MobileMenuButton,
  MobileNavigation,
  Navigation,
  Switch,
} from "./navigations"

const Header = () => {
  const currentPath = usePathname()
  const [hideNavBar, setHideNavBar] = useState(false)
  const scroll = useScroll()

  useScrollPosition(({ prevPos, currPos }) => {
    console.log(currPos.x)
    console.log(currPos.y)
  })

  const scrolled50Ref = useRef(false)

  useEffect(() => {
    const scrollFun = () => {
      if (window.pageYOffset > 50) {
        if (!scrolled50Ref.current) {
          scrolled50Ref.current = true
          console.log("scrolled 50 px")
        }
      } else {
        scrolled50Ref.current = false
      }

      if (window.pageYOffset % 50 >= 45) {
        console.log("scrolled 50-ish pixels")
      }
    }

    window.addEventListener("scroll", scrollFun)

    return () => {
      window.removeEventListener("scroll", scrollFun)
    }
  }, [])

  useEffect(() => {
    console.log(scroll.y)
    if (scroll.y > 150 && scroll.y - scroll.lastY > 0) {
      setHideNavBar(true)
    } else if (scroll.y < 150 && scroll.y - scroll.lastY < 0) {
      setHideNavBar(false)
    }
  }, [scroll.y, scroll.lastY, hideNavBar])

  return (
    <Disclosure
      as="nav"
      className="border-y-1 sticky top-0 z-50 border-black/5 bg-gray-50/50 shadow-sm shadow-gray-300 backdrop-blur dark:border-white/10 dark:bg-slate-800 dark:shadow-slate-900/60"
    >
      {({ open }) => (
        <>
          <motion.nav
            className="mx-auto flex max-w-5xl items-center justify-between px-2 py-4"
            aria-label="Global"
          >
            {/* Logo */}
            <div className="flex flex-1 justify-start pl-2">
              <Logo image={profile.image} description={profile.description} />
            </div>

            {/* Navigation */}
            <div className="hidden gap-x-6 sm:flex sm:flex-1">
              <Navigation path={currentPath} menu={menu} />
            </div>
            {/* Dark Mode */}
            <div className="hidden justify-end md:flex md:flex-1">
              <Switch />
            </div>
            {/* Mobile Menu */}
            <div className="flex flex-1 justify-end pr-2 md:hidden">
              <MobileMenuButton open={open} />
            </div>
          </motion.nav>
          {/* <!-- Mobile Navigation --> */}
          <MobileNavigation fragment={Fragment} menu={menu} />
        </>
      )}
    </Disclosure>
  )
}

export default Header
