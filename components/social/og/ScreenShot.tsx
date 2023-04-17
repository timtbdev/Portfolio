import React from "react"

import Wrapper from "./Wrapper"

// Ensures tw prop is typed.
declare module "react" {
  interface HTMLAttributes<T> {
    tw?: string
  }
}

interface ScreenshotImageProps {
  image: string
  /**
   * Fallback image to use if the image prop fails to load.
   */
  fallbackImage: string
}

const ScreenShot = ({ image, fallbackImage }: ScreenshotImageProps) => (
  <Wrapper>
    <div tw="relative h-full w-full flex flex-col justify-center items-center">
      <div
        tw="relative mt-[140px] flex rounded-2xl"
        style={{ boxShadow: "0 0 45px -3px rgba(0,0,0,.3)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fallbackImage}
          tw="absolute inset-0 rounded-2xl"
          width="1024"
          height="576"
          alt="screenshot"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          width="1024"
          height="576"
          tw="rounded-2xl"
          alt="screenshot"
        />
      </div>
    </div>
  </Wrapper>
)

export default ScreenShot
