import React from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

interface Props {
  image: string | StaticImageData
  description: string
}

export function Logo({ image, description }: Props) {
  return (
    <>
      <Link
        href="/"
        className="h-13 w-13 focus-visible-base rounded-full bg-gray-100 p-0.5 shadow-sm shadow-gray-800/50 ring-1 ring-gray-900/5 backdrop-blur dark:bg-neutral-800/90 dark:ring-white/10"
      >
        <Image
          src={image}
          alt={description}
          className="h-12 w-12 rounded-full bg-gray-100 object-cover dark:bg-neutral-800/90"
          priority
        />
      </Link>
    </>
  )
}
