"use client"

import { FC, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useMediaQuery } from "react-responsive"

import { Menu } from "types"
import { useScrollListener } from "@hooks/useScrollListener"

interface MobileBottomNavigationProps {
  menu: Menu[]
}

const variants = {
  visible: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: 0 },
  hidden: { opacity: 0, y: 50 },
}

const MobileBottomNavigation: FC<MobileBottomNavigationProps> = ({ menu }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
  const [showNavBar, setShowNavBar] = useState(false)
  const scroll = useScrollListener()

  useEffect(() => {
    if (
      scroll.y > 150 &&
      scroll.y - scroll.lastY > 0 &&
      !showNavBar &&
      isMobile
    ) {
      setShowNavBar(true)
    } else if (
      scroll.y < 150 &&
      scroll.y - scroll.lastY < 0 &&
      showNavBar &&
      isMobile
    ) {
      setShowNavBar(false)
    }
  }, [scroll.y, scroll.lastY, showNavBar, isMobile])

  return (
    <>
      <motion.div
        className="sticky bottom-0 left-0 z-50 h-16 w-full border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700 md:hidden"
        initial="initial"
        animate={showNavBar ? "visible" : "hidden"}
        variants={variants}
        transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
      >
        <div className="mx-auto grid h-full max-w-lg grid-cols-4 font-medium">
          {menu.slice(0, 4).map((item) => (
            <button
              key={item.idx + item.title}
              type="button"
              className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <item.icon
                className="h-6 w-6 text-slate-600 dark:text-slate-200"
                aria-hidden="true"
              />
              <span className="font-regular text-base text-slate-600 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </>
  )
}

export default MobileBottomNavigation
