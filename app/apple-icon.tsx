import { ImageResponse } from "next/server"

export const size = {
  width: 180,
  height: 180,
}
export const contentType = "image/png"
export const runtime = "edge"

export default function appleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          backgroundColor: "transparent",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="182"
          height="182"
          viewBox="0 0 182 182"
        >
          <g>
            <path
              fill="#B3B3B3"
              d="M91 4.75a86.25 86.25 0 1 0 0 172.5 86.25 86.25 0 1 0 0-172.5z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#EAC3A2"
              d="M72.25 90.02h37.5v42.8h-37.5z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#EAD8C5"
              d="M91 109.75a30 30 0 0 1-30-30v-11.25a30 30 0 1 1 60 0v11.25a30 30 0 0 1-30 30z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#3b82f6"
              d="M91 177.25c25.26 0 47.98-10.86 63.75-28.16 0-6.18-4.58-13.31-10.21-15.89l-34.79-15.95s-7.5 7.5-18.75 7.5-18.75-7.5-18.75-7.5l-34.79 15.94c-5.65 2.59-10.21 9.7-10.21 15.9 15.77 17.3 38.49 28.16 63.75 28.16z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#000000"
              d="M106 53.5a15 15 0 0 1 15 15v-18.75c0-8.25-6.72-15-15-15h-1.87l-3.94-7.88a4.11 4.11 0 0 0-5.15-1.98l-23.59 9.43c-5.77 2.3-10.45 9.22-10.45 15.44v18.74a15 15 0 0 1 15-15h30z"
            ></path>
          </g>
        </svg>
      </div>
    ),
    size
  )
}
