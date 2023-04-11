import { FC } from "react"

interface NumberProps {
  number: number
}

const Number: FC<NumberProps> = ({ number }) => {
  return (
    <>
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 align-middle text-lg font-bold uppercase text-slate-600 shadow-md shadow-black/5 ring-1 ring-black/10 dark:bg-slate-700/50 dark:from-slate-700/30 dark:via-slate-700 dark:to-slate-800 dark:text-slate-400 dark:ring-slate-400/40">
        <span>{number}</span>
      </div>
    </>
  )
}

export default Number
