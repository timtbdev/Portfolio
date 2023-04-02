import { FC } from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import clsx from "clsx"

interface AvatarProps {
  image: StaticImageData
  description: string
  large?: boolean
}

const Avatar: FC<AvatarProps> = ({ large = false, image, description }) => {
  return (
    <div
      className={clsx(
        large ? "h-20 w-20" : "h-13 w-13",
        "focus-visible-base rounded-full bg-gray-100 p-0.5 shadow-sm shadow-gray-800/50 ring-1 ring-gray-900/5 backdrop-blur dark:bg-neutral-800/90 dark:ring-white/10"
      )}
    >
      <Image
        src={image}
        alt={description}
        className={clsx(
          large ? "h-19 w-19" : "h-12 w-12",
          "focus-visible-base rounded-full bg-gray-100 object-cover dark:bg-neutral-800/90"
        )}
        priority
      />
    </div>
  )
}

export default Avatar
