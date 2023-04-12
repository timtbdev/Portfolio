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
          "relative mx-auto overflow-hidden rounded-xl bg-gray-50 p-3 shadow-sm shadow-black/5 ring-1 ring-black/10 dark:bg-slate-800",
          className
        )}
      >
        <Image
          className="relative w-full rounded-lg"
          src={image}
          alt={description}
          width={800}
          height={600}
          priority
        />
      </div>
    </>
  )
}

export default Photo
