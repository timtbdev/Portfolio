import { ExoticComponent, ReactNode } from "react"
import { Disclosure, Transition } from "@headlessui/react"
import { motion } from "framer-motion"

import { Menu } from "types"

interface IProps {
  fragment: ExoticComponent<{
    children?: ReactNode | undefined
  }>
  menu: Menu[]
}

const containerVariants = {
  hidden: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  visible: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const itemVariants = {
  hidden: {
    y: 20,
    opacity: 0,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },

  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

export default function MobileNavigation({ fragment, menu }: IProps) {
  return (
    <>
      <Transition
        as={fragment}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-300"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Disclosure.Panel className="border-t border-dashed border-slate-400 dark:border-slate-400/40 lg:hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {menu.map((item) => (
              <Disclosure.Button key={item.idx} as="a" href={item.url}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-x-6 border-b border-dashed border-gray-400/40 bg-white p-3 text-base font-semibold leading-7 text-gray-600 transition-colors hover:bg-gray-50 dark:border-slate-400/40 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  variants={itemVariants}
                >
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-slate-400 bg-gray-100 shadow-md transition-colors group-hover:border-2 group-hover:border-blue-400 group-hover:bg-gray-50 dark:border-slate-500 dark:bg-slate-700 dark:shadow-slate-900 dark:group-hover:border-sky-500 dark:group-hover:bg-slate-700">
                    <item.icon
                      className="h-6 w-6 text-slate-600 dark:text-slate-200"
                      aria-hidden="true"
                    />
                  </div>

                  {item.title}
                </motion.div>
              </Disclosure.Button>
            ))}
          </motion.div>
        </Disclosure.Panel>
      </Transition>
    </>
  )
}
