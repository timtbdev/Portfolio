import { FC, ReactNode } from "react"

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

interface OgWrapperProps {
  children: ReactNode
}

const OgWrapper: FC<OgWrapperProps> = ({ children }) => (
  <div tw="flex w-full h-full bg-gray-100">
    <div tw="flex flex-col w-full h-full px-[80px] py-[70px] items-start justify-center">
      {children}
    </div>
  </div>
)

export default OgWrapper
