import { FC, ReactNode } from "react"
import Image, { StaticImageData } from "next/image"
import { cn, shimmer, toBase64 } from "@/libs/utils"

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
          "lg:aspect-square relative flex aspect-[16/9] sm:aspect-[2/1] lg:w-[600px]",
          className
        )}
      >
        <Image
          src={image}
          alt={description}
          fill={true}
          priority={true}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(256, 256)
          )}`}
          className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
        />
      </div>
    </>
  )
}

export default Photo
