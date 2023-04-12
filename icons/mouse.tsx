import { FC } from "react"

interface MouseIconAttributes {
  className?: string
}

const MouseIcon: FC<MouseIconAttributes> = ({ className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      className={className}
    >
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        fill="none"
        stroke="currentColor"
      >
        <line x1="24" y1="12" x2="24" y2="23" stroke="currentColor"></line>
        <path d="M24,46h0A15,15,0,0,1,9,31V17A15,15,0,0,1,24,2h0A15,15,0,0,1,39,17V31A15,15,0,0,1,24,46Z"></path>
      </g>
    </svg>
  )
}

export default MouseIcon
