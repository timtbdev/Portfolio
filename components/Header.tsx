"use client"

import { Fragment, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import useBoundedScroll from "@/hooks/useBoundedScroll"
import { Disclosure } from "@headlessui/react"
import { motion, useTransform } from "framer-motion"

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
  let { scrollYBoundedProgress } = useBoundedScroll(200)
  let scrollYBoundedProgressThrottled = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1]
  )
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    return scrollYBoundedProgressThrottled.onChange((current) => {
      current == 1 ? setHidden(true) : setHidden(false)
    })
  }, [scrollYBoundedProgressThrottled, hidden])

  return (
    <motion.div
      className="border-y-1 sticky top-0 z-50 border-black/5 bg-gray-50/50 shadow-sm shadow-gray-300 backdrop-blur dark:border-white/10 dark:bg-slate-800 dark:shadow-slate-900/60"
      animate={hidden ? "hidden" : "visible"}
      variants={variants}
      onHoverStart={() => setHidden(false)}
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
    >
      <Disclosure>
        {({ open }) => (
          <>
            <nav
              className="mx-auto flex max-w-5xl items-center justify-between px-2 py-4"
              aria-label="Global"
            >
              {/* Logo */}
              <div className="flex flex-1 justify-start pl-2">
                <Logo image={profile.image} description={profile.description} />
              </div>

              {/* Navigation */}
              <div>
                <div className="z-10 hidden gap-x-6 sm:flex sm:flex-1">
                  <Navigation path={currentPath} menu={menu} />
                </div>
              </div>

              {/* Dark Mode */}
              <div className="hidden justify-end md:flex md:flex-1">
                <Switch />
              </div>
              {/* Mobile Menu */}
              <div className="flex flex-1 justify-end pr-2 md:hidden">
                <MobileMenuButton open={open} />
              </div>
            </nav>
            {/* <!-- Mobile Navigation --> */}
            <MobileNavigation fragment={Fragment} menu={menu} />
          </>
        )}
      </Disclosure>
    </motion.div>
  )
}

export default Header
