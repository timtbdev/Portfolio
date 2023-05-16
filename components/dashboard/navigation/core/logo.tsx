import { ProfileIcon } from "@/icons"

export default function Logo() {
  return (
    <>
      <div className="flex shrink-0 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="h-8 w-8"
        >
          <g
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            transform="translate(0.5 0.5)"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M10.118,14.53l-.618,2.47-3.897,.866c-.37,.082-.661,.366-.753,.734l-.36,1.438"
              stroke="currentColor"
            ></path>
            <path
              d="M13.883,14.53l.617,2.47,3.897,.866c.37,.082,.661,.366,.753,.734l.36,1.438"
              stroke="currentColor"
            ></path>
            <rect
              x="8"
              y="6"
              width="8"
              height="9"
              rx="4"
              ry="4"
              stroke="currentColor"
            ></rect>
            <circle cx="12" cy="12" r="11"></circle>
          </g>
        </svg>
      </div>
    </>
  )
}
