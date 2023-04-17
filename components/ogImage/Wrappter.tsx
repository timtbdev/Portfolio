import React from "react"

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

interface WrapperProps {
  children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => (
  <div tw="flex w-full h-full">
    <img
      tw="flex absolute left-0 top-0 w-full h-[110%]"
      src="https://timtb.dev/static/social-bg-dark-lines.jpg"
      alt="background"
      width="1200"
      height="600"
    />
    <div tw="flex flex-col w-full h-full px-[80px] py-[70px] items-start justify-center">
      {children}
    </div>
  </div>
)
