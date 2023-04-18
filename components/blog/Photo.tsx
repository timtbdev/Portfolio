import { FC, ReactNode } from "react"
import Image, { StaticImageData } from "next/image"
import { cn } from "@/libs/utils"

interface PhotoProps {
  image: StaticImageData
  description?: string
  className?: string
}

const Photo: FC<PhotoProps> = ({ image, description = "", className = "" }) => {
  return (
    <>
      <div
        className={cn(
          "relative mx-auto w-full max-w-xl overflow-hidden rounded-xl bg-gray-50 p-3 shadow-sm shadow-black/5 ring-1 ring-black/10 dark:bg-slate-800 sm:max-w-2xl",
          className
        )}
      >
        <Image
          className="relative rounded-lg"
          src={image}
          alt={description}
          height={650}
          width={650}
          placeholder="blur"
          priority={true}
        />
      </div>
    </>
  )
}

export default Photo
