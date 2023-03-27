import React from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

interface IProps {
  image: string | StaticImageData
  description: string
}

export default function Logo({ image, description }: IProps) {
  return (
    <>
      <Link
        href="/"
        className="h-13 w-13 rounded-full p-0.5 shadow-md shadow-slate-300 ring-[1.5px] ring-slate-400/40 backdrop-blur transition-all hover:shadow-lg hover:shadow-blue-300/50 hover:ring-2 hover:ring-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:bg-slate-800 dark:shadow-slate-900 dark:ring-slate-400/40 dark:hover:shadow-sky-400/20 dark:hover:ring-sky-500 dark:focus-visible:ring-orange-500"
      >
        <Image
          src={image}
          alt={description}
          className="h-12 w-12 rounded-full bg-white object-cover dark:bg-neutral-800"
          priority
        />
      </Link>
    </>
  )
}
