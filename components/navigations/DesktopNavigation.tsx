import React from "react"
import Link from "next/link"
import { Menu } from "@/types"
import { clsx } from "clsx"
import { AnimatePresence, Variants, motion } from "framer-motion"

interface Props {
  path: string | null
  menu: Menu[]
}

const variants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export function DesktopNavigation({ path, menu }: Props) {
  const [hoveredItem, setHoveredItem] = React.useState("")
  const [hoverArea, setHoverArea] = React.useState(false)
  return (
    <>
      <div
        className="hidden gap-x-6 lg:flex"
        onMouseEnter={() => setHoverArea(true)}
        onMouseLeave={() => setHoverArea(false)}
      >
        {menu.map(({ url, title, idx }) => (
          <Link
            href={url}
            key={idx}
            onMouseEnter={() => setHoveredItem(title)}
            onMouseLeave={() => setHoveredItem("")}
            className="focus-visible-base relative inline-flex items-center rounded-full bg-transparent px-4 py-1 text-base font-medium text-gray-600 ring-1 ring-transparent dark:text-gray-400"
          >
            <AnimatePresence>
              {((title === hoveredItem && hoverArea) ||
                (path === url && !hoverArea)) && (
                <motion.div
                  className="focus-visible-base absolute top-0 left-0 mx-auto h-full w-full rounded-full bg-gray-100 px-4 text-gray-600 ring-1 ring-gray-200 dark:bg-neutral-800 dark:text-white dark:ring-neutral-700/50"
                  layoutId="menu"
                  key={title + idx}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                />
              )}
            </AnimatePresence>
            <div className="relative z-10">{title}</div>
          </Link>
        ))}
      </div>
    </>
  )
}
