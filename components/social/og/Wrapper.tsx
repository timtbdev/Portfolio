import React, { type CSSProperties } from "react"
import { absoluteUrl } from "@/libs/utils"

interface WrapperProps {
  children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps) => (
  <div tw="flex w-full h-full">
    <div tw="flex absolute left-0 top-0 w-full h-full" />
    <div tw="flex flex-col w-full h-full px-[80px] py-[70px] items-start justify-center">
      {children}
    </div>
  </div>
)

export default Wrapper
