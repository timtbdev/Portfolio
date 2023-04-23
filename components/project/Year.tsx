import { FC } from "react"
import { CalendarIcon } from "@heroicons/react/20/solid"

interface YearProps {
  year: string
}

const Year: FC<YearProps> = ({ year }) => {
  return (
    <>
      <div className="relative mx-auto max-w-xl">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="h-0.5 w-full bg-gradient-to-r from-white via-blue-500 to-white opacity-80 dark:from-slate-800 dark:via-sky-500 dark:to-slate-800"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="inline-flex items-center rounded-lg border border-black/10 bg-white px-4 py-1.5 text-sm font-medium leading-5 text-slate-500 shadow-sm ring-transparent dark:border-white/20 dark:bg-slate-800 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <title>calendar</title>
              <g
                stroke-width="1"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="0.5" y1="5.5" x2="15.5" y2="5.5"></line>
                <path d="M14,2.5H2A1.5,1.5,0,0,0,.5,4v9A1.5,1.5,0,0,0,2,14.5H14A1.5,1.5,0,0,0,15.5,13V4A1.5,1.5,0,0,0,14,2.5Z"></path>
                <line x1="4.5" y1="0.5" x2="4.5" y2="2.5"></line>
                <line x1="11.5" y1="0.5" x2="11.5" y2="2.5"></line>
              </g>
            </svg>
            <span className="ml-1.5">{year}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Year
