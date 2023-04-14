import { ImageResponse } from "next/server"

export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"
export const runtime = "edge"

export default function icon() {
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
          width="32"
          height="32"
          viewBox="0 0 34 32"
        >
          <g>
            <path
              fill="#B3B3B3"
              d="M17.08 1.67a15.41 15.41 0 1 0 0 30.82 15.41 15.41 0 1 0 0-30.82z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#EAC3A2"
              d="M13.73 16.91h6.7v7.64h-6.7z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#EAD8C5"
              d="M17.08 20.43a5.36 5.36 0 0 1-5.36-5.36v-2.01a5.36 5.36 0 1 1 10.72 0v2.01a5.36 5.36 0 0 1-5.36 5.36z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#3b82f6"
              d="M17.08 32.49c4.51 0 8.57-1.94 11.39-5.03 0-1.1-0.82-2.38-1.82-2.84l-6.22-2.85s-1.34 1.34-3.35 1.34-3.35-1.34-3.35-1.34l-6.22 2.85c-1.01 0.46-1.82 1.73-1.82 2.84 2.82 3.09 6.88 5.03 11.39 5.03z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#000000"
              d="M19.76 10.38a2.68 2.68 0 0 1 2.68 2.68v-3.35c0-1.47-1.2-2.68-2.68-2.68h-0.33l-0.71-1.41a0.73 0.73 0 0 0-0.92-0.35l-4.21 1.68c-1.03 0.41-1.87 1.65-1.87 2.76v3.35a2.68 2.68 0 0 1 2.68-2.68h5.36z"
            ></path>
          </g>
        </svg>
      </div>
    ),
    size
  )
}
