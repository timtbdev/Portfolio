import React from "react"

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

interface WrapperProps {
  children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => (
  <div tw="flex w-full h-full bg-gray-100">
    <div tw="flex flex-col w-full h-full px-[80px] py-[70px] items-start justify-center">
      {children}
    </div>
  </div>
)
