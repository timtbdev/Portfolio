import { ImageResponse } from "next/server"

export const size = {
  width: 16,
  height: 16,
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
          width="16"
          height="16"
          viewBox="0 0 18 18"
        >
          <g>
            <path
              fill="#B3B3B3"
              d="M8.92 1.33a7.59 7.59 0 1 0 0 15.18 7.59 7.59 0 1 0 0-15.18z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#EAC3A2"
              d="M7.27 8.83h3.3v3.77h-3.3z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#EAD8C5"
              d="M8.92 10.57a2.64 2.64 0 0 1-2.64-2.64v-0.99a2.64 2.64 0 1 1 5.28 0v0.99a2.64 2.64 0 0 1-2.64 2.64z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#3b82f6"
              d="M8.92 16.51c2.22 0 4.22-0.96 5.61-2.48 0-0.54-0.4-1.17-0.9-1.4l-3.06-1.4s-0.66 0.66-1.65 0.66-1.65-0.66-1.65-0.66l-3.06 1.4c-0.5 0.23-0.9 0.85-0.9 1.4 1.39 1.52 3.39 2.48 5.61 2.48z"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#000000"
              d="M10.24 5.62a1.32 1.32 0 0 1 1.32 1.32v-1.65c0-0.73-0.59-1.32-1.32-1.32h-0.16l-0.35-0.69a0.36 0.36 0 0 0-0.45-0.18l-2.08 0.83c-0.51 0.2-0.92 0.81-0.92 1.36v1.65a1.32 1.32 0 0 1 1.32-1.32h2.64z"
            ></path>
          </g>
        </svg>
      </div>
    ),
    size
  )
}
