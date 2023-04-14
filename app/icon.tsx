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
          width="42"
          height="42"
          viewBox="0 0 42 42"
        >
          <g>
            <path
              fill="#d5d6d6"
              d="M21.02 9.31a11.71 11.71 0 1 0 0 23.42 11.71 11.71 0 1 0 0-23.42z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#d1b38e"
              d="M18.47 20.89h5.1v5.81h-5.1z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#dabfa9"
              d="M21.02 23.57a4.07 4.07 0 0 1-4.07-4.08v-1.52a4.07 4.07 0 1 1 8.14 0v1.52a4.07 4.07 0 0 1-4.07 4.08z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#3b82f6"
              d="M21.02 32.73c3.43 0 6.51-1.47 8.66-3.82 0-0.84-0.62-1.81-1.39-2.16l-4.72-2.16s-1.02 1.02-2.55 1.01-2.55-1.02-2.55-1.01l-4.72 2.16c-0.77 0.35-1.38 1.31-1.39 2.16a11.69 11.69 0 0 0 8.66 3.82z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#000000"
              d="M23.06 15.93a2.04 2.04 0 0 1 2.03 2.04v-2.55c0-1.12-0.91-2.04-2.03-2.04h-0.25l-0.54-1.07a0.55 0.55 0 0 0-0.7-0.26l-3.2 1.27c-0.78 0.31-1.42 1.25-1.42 2.1v2.55a2.04 2.04 0 0 1 2.03-2.04h4.08z"
            ></path>
          </g>
        </svg>
      </div>
    ),
    size
  )
}
