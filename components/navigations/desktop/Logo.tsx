import { FC } from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { ProfileIcon } from "@/icons"

interface LogoProps {
  image: string | StaticImageData
  description: string
}

const Logo: FC<LogoProps> = ({ image, description }) => {
  return (
    <>
      <Link
        href="/"
        className="group mr-4 flex items-center space-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-orange-500"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full shadow-md shadow-slate-500/40 ring-[0.5px] ring-slate-500/40 group-hover:shadow-md group-hover:shadow-orange-500/40 group-hover:ring-2 group-hover:ring-orange-500 dark:bg-slate-700/50 dark:shadow-slate-900 dark:ring-slate-500 dark:group-hover:shadow-sky-400/50 dark:group-hover:ring-sky-500">
          <ProfileIcon />
        </div>
        <div className="font-calsans text-xl tracking-normal text-slate-600 dark:text-slate-200">
          Tim
        </div>
      </Link>
    </>
  )
}
export default Logo
