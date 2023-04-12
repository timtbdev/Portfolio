import { FC } from "react"
import { cn } from "@/libs/utils"

interface ConnectorProps {
  className?: string
}

const Connector: FC<ConnectorProps> = ({ className = "" }) => {
  return (
    <>
      <div className={cn("mx-auto max-w-xl text-center", className)}>
        <div className="mx-auto w-fit">
          <svg
            width="75"
            height="80"
            className="text-slate-300 dark:text-slate-700"
            viewBox="6 105 65 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="40"
              y="154"
              width="2"
              height="84"
              transform="rotate(-180 40 154)"
              fill="url(#paint0_linear_4764_1450)"
            ></rect>
            <rect
              opacity="0.3"
              x="32"
              y="148"
              width="14"
              height="14"
              rx="7"
              fill="currentColor"
            ></rect>
            <rect
              x="35"
              y="151"
              width="8"
              height="8"
              rx="4"
              fill="currentColor"
            ></rect>
            <defs>
              <linearGradient
                id="paint0_linear_4764_1450"
                x1="41"
                y1="154"
                x2="41"
                y2="268"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="currentColor"></stop>
                <stop
                  offset="1"
                  stopColor="currentColor"
                  stopOpacity="0"
                ></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  )
}

export default Connector
