import { FC } from "react"

interface ArrowIconAttributes {
  className?: string
}

const ArrowIcon: FC<ArrowIconAttributes> = ({ className = "" }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      ></path>
    </svg>
  )
}

export default ArrowIcon
