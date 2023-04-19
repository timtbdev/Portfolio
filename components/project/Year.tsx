import { FC } from "react"

interface YearProps {
  year: string
}

const Year: FC<YearProps> = ({ year }) => {
  return (
    <>
      <div className="mx-auto flex justify-center text-center">
        <div className="space-x-1 rounded-full bg-gray-100 px-4 py-1.5 text-center text-sm font-medium text-slate-500 shadow-sm shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700/30 dark:text-slate-500 dark:ring-white/10">
          <span>{year}</span>
        </div>
      </div>
    </>
  )
}

export default Year
