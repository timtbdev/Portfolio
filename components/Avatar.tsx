import { FC } from "react"
import Image, { StaticImageData } from "next/image"
import { cn } from "@/libs/utils"

interface AvatarProps {
  image: StaticImageData
  description: string
  large?: boolean
  className?: string
}

const Avatar: FC<AvatarProps> = ({
  large = false,
  image,
  description,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "h-24 w-24 rounded-full bg-gray-100 p-0.5 shadow-sm shadow-gray-800/50 ring-1 ring-gray-900/5 backdrop-blur dark:bg-neutral-800/90 dark:ring-white/10",
        className
      )}
    >
      <Image
        src={image}
        alt={description}
        className="h-[92px] w-[92px] rounded-full bg-gray-100 object-cover dark:bg-neutral-800/90"
        placeholder="blur"
        priority={true}
      />
    </div>
  )
}

export default Avatar
