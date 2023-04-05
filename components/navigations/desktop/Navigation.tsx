import { FC, useState } from "react"
import Link from "next/link"
import { Menu } from "@/types"
import { AnimatePresence, Variants, motion } from "framer-motion"

interface NavigationProps {
  path?: string
  menu: Menu[]
}

const variants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const Navigation: FC<NavigationProps> = ({ path, menu }) => {
  const [hoveredItem, setHoveredItem] = useState("")
  const [hoverArea, setHoverArea] = useState(false)

  return (
    <>
      <div
        className="hidden gap-x-6 md:flex"
        onMouseEnter={() => setHoverArea(true)}
        onMouseLeave={() => setHoverArea(false)}
      >
        {menu.map(({ url, title, idx }) => (
          <Link
            href={url}
            key={idx}
            onMouseEnter={() => setHoveredItem(title)}
            onMouseLeave={() => setHoveredItem("")}
            className="group relative inline-flex items-center rounded-full bg-transparent px-4 py-1 text-base font-medium text-gray-600 ring-1 ring-transparent transition duration-200 active:scale-[99%] active:ring-black/20 dark:text-slate-400 dark:active:ring-white/20"
          >
            <AnimatePresence>
              {title === hoveredItem && hoverArea && (
                <motion.div
                  className="absolute left-0 top-0 mx-auto h-full w-full rounded-full bg-gradient-to-tr from-gray-200 via-gray-100 to-gray-50 px-4 shadow-md shadow-black/5 ring-1 ring-black/10 dark:bg-gradient-to-tl dark:from-slate-700 dark:via-slate-700 dark:to-slate-800 dark:ring-white/10"
                  layoutId="menu"
                  key={title + idx}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                />
              )}
              {path === url && !hoverArea && (
                <motion.div
                  className="absolute left-0 top-0 mx-auto h-full w-full rounded-full bg-gradient-to-t from-gray-100 via-gray-50 to-gray-50 px-4 shadow-md shadow-black/5 ring-1 ring-black/10 dark:bg-gradient-to-t dark:from-slate-700 dark:via-slate-700 dark:to-slate-800 dark:ring-white/10"
                  layoutId="menu"
                  key={title + idx}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                />
              )}
            </AnimatePresence>
            <div className="relative">{title}</div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Navigation
