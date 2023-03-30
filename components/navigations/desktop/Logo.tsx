import { FC } from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

interface LogoProps {
  image: string | StaticImageData
  description: string
}

const Logo: FC<LogoProps> = ({ image, description }) => {
  return (
    <>
      <Link
        href="/"
        className="h-13 w-13 rounded-full p-0.5 shadow-md shadow-slate-500/40 ring-[1.5px] ring-slate-500/40 backdrop-blur transition-all hover:shadow-lg hover:shadow-blue-300/50 hover:ring-2 hover:ring-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:bg-slate-700/50 dark:shadow-slate-900 dark:ring-slate-500 dark:hover:shadow-sky-400/20 dark:hover:ring-sky-500 dark:focus-visible:ring-orange-500"
      >
        <Image
          src={image}
          alt={description}
          className="h-12 w-12 rounded-full bg-gray-100 object-cover dark:bg-slate-800"
          priority
        />
      </Link>
    </>
  )
}
export default Logo
