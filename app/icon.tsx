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
          background: "black",
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
          viewBox="0 0 32 32"
        >
          <title>circle-09</title>
          <g
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            fill="none"
            stroke="#F7F7F7"
          >
            <path
              d="M25.53,27.583 c-0.185-3.257-2.042-4.29-4.758-5.195c-1.942-0.647-2.567-2.609-2.768-3.806"
              stroke="#F7F7F7"
            ></path>{" "}
            <path
              d="M13.993,18.581 c-0.201,1.197-0.824,3.16-2.765,3.808c-2.716,0.905-4.59,1.925-4.774,5.182"
              stroke="#F7F7F7"
            ></path>{" "}
            <path
              d="M16,19L16,19 c-2.761,0-5-2.239-5-5v-2c0-2.761,2.239-5,5-5h0c2.761,0,5,2.239,5,5v2C21,16.761,18.761,19,16,19z"
              stroke="#F7F7F7"
            ></path>{" "}
            <ellipse
              transform="matrix(0.0474 -0.9989 0.9989 0.0474 -0.7397 31.2244)"
              cx="16"
              cy="16"
              rx="15"
              ry="15"
            ></ellipse>
          </g>
        </svg>
      </div>
    ),
    size
  )
}
