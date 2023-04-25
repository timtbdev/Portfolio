import { FC, ReactNode } from "react"

interface WrapperProps {
  children: ReactNode
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <>
      <div className="relative w-full rounded-2xl bg-white/20 p-2.5 shadow-sm shadow-black/5 ring-[0.8px] ring-black/5 dark:bg-white/5 dark:shadow-white/5 dark:ring-white/10">
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 opacity-[0.15] blur-lg dark:from-sky-500 dark:to-sky-600"></div>
        <div className="relative max-w-full rounded-[0.62rem] bg-gray-50  shadow-sm shadow-black/5 ring-[0.8px] ring-black/5 dark:bg-slate-800 dark:shadow-white/5 dark:ring-white/10">
          {children}
        </div>
      </div>
    </>
  )
}

export default Wrapper
