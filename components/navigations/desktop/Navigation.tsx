import React from "react"
import Link from "next/link"
import { Menu } from "@/types"
import { AnimatePresence, Variants, motion } from "framer-motion"

interface IProps {
  path: string | null
  menu: Menu[]
}

const variants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function Navigation({ path, menu }: IProps) {
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
            className="relative inline-flex items-center rounded-full bg-transparent px-4 py-1 text-base font-medium text-slate-600 ring-1 ring-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:text-slate-200 dark:focus-visible:ring-orange-500"
          >
            <AnimatePresence>
              {((title === hoveredItem && hoverArea) ||
                (path === url && !hoverArea)) && (
                <motion.div
                  className="absolute top-0 left-0 mx-auto h-full w-full rounded-full bg-gray-50 px-4 shadow-md shadow-blue-300 ring-2 ring-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:bg-slate-700/50 dark:shadow-sky-400/50 dark:ring-sky-500 dark:focus-visible:ring-orange-500"
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
