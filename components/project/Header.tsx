import { FC } from "react"
import Image from "next/image"

interface HeaderProps {
  title: string
  tags: Array<string>
  icon: string
}

const Header: FC<HeaderProps> = ({ title, tags, icon }) => {
  return (
    <>
      <div className="relative p-3">
        <div className="relative flex flex-col items-center justify-center gap-6 rounded-xl border border-dashed border-slate-500/50 p-4 dark:border-white/10 sm:flex-row">
          <div className="text-normal absolute left-2.5 top-0 -translate-y-1/2 bg-white px-2 font-normal text-slate-500 dark:bg-slate-800">
            Android
          </div>
          <Image
            src={icon}
            alt={title}
            width={80}
            height={80}
            priority={true}
            className="rounded-full"
          />
          <div className="flex-auto text-center sm:text-left">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {title}
            </h3>
            <p className="mt-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx + tag}
                  className="mr-1 inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-sm font-medium text-slate-500 ring-1 ring-inset ring-gray-500/10 dark:bg-slate-700/30 dark:ring-white/10"
                >
                  {tag}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
