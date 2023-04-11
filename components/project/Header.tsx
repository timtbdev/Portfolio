import { FC } from "react"
import Image from "next/image"
import dateFormat from "date-fns/format"

interface HeaderProps {
  title: string
  releaseDate: string
  icon: string
  iconDescription: string
  type: string
}

const Header: FC<HeaderProps> = ({
  title,
  releaseDate,
  icon,
  iconDescription,
  type,
}) => {
  return (
    <>
      <div className="border-b border-dashed border-black/5 pb-3 dark:border-white/10">
        <div className="sm:mt-10 sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="mx-auto h-20 w-20 shrink-0 rounded-full">
              <span className="sr-only">{iconDescription}</span>
              <Image
                className="rounded-full"
                src={icon}
                width={80}
                height={80}
                alt={iconDescription}
                priority
              />
            </div>

            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="inline-flex text-sm font-medium text-slate-500 dark:text-slate-400">
                {type}
              </p>
              <p className="font-calsans text-xl text-slate-900 dark:text-slate-200 sm:text-2xl">
                {title}
              </p>

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {dateFormat(new Date(releaseDate), "MMMM yyyy")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
