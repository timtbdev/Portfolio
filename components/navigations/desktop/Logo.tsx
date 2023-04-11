import { FC } from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { ProfileIcon } from "@/icons"

import { cn } from "@libs/utils"

interface LogoProps {
  image: string | StaticImageData
  description: string
  small?: boolean
}

const Logo: FC<LogoProps> = ({ image, description, small = false }) => {
  return (
    <>
      <Link href="/" className="group mr-4 flex items-center space-x-1">
        <div className="group flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 text-gray-400 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20 dark:bg-gradient-to-t dark:from-slate-700 dark:via-slate-700 dark:to-slate-800 dark:text-slate-500 dark:ring-white/10 dark:hover:bg-gradient-to-br dark:hover:from-slate-800 dark:hover:via-slate-700 dark:hover:to-slate-600 dark:active:ring-white/20">
          <ProfileIcon />
        </div>
        {!small && (
          <div className="font-calsans text-lg text-gray-600 dark:text-slate-400">
            Tim
          </div>
        )}
      </Link>
    </>
  )
}
export default Logo
