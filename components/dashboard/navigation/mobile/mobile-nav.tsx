import { FC } from "react"
import Image from "next/image"
import { cn } from "@/libs/utils"
import { NavItem } from "@/types"
import { Disclosure } from "@headlessui/react"
import { signOut } from "next-auth/react"

import { User } from "types"

interface MobileNavProps {
  navigations: NavItem[]
  currentPath: string
  user: User
}

const MobileNav: FC<MobileNavProps> = ({ navigations, currentPath, user }) => {
  return (
    <>
      <Disclosure.Panel className="lg:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {/* Current: "bg-gray-900 text-white", Default: "" */}

          {navigations.map((item, idx) => (
            <Disclosure.Button
              as="a"
              key={idx + item.name}
              href={item.href}
              className={cn(
                "block rounded-md px-3 py-2 text-base font-medium",
                {
                  "bg-gray-900 text-white": currentPath === item.href,
                },
                {
                  "text-gray-300 hover:bg-gray-700 hover:text-white":
                    currentPath != item.href,
                }
              )}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
        <div className="border-t border-gray-700 pb-3 pt-4">
          <div className="flex items-center px-5">
            <div className="shrink-0">
              <Image
                className="h-10 w-10 rounded-full"
                src={user.image}
                alt={user.name}
                height={40}
                width={40}
                priority
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-white">
                {user.name}
              </div>
              <div className="text-sm font-medium text-gray-400">
                {user.email}
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1 px-2">
            <Disclosure.Button
              as="a"
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Your Profile
            </Disclosure.Button>
            <Disclosure.Button
              as="a"
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Settings
            </Disclosure.Button>
            <Disclosure.Button
              as="a"
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.origin}/login`,
                })
              }
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Sign out
            </Disclosure.Button>
          </div>
        </div>
      </Disclosure.Panel>
    </>
  )
}

export default MobileNav
