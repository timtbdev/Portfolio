import { absoluteUrl } from "@/libs/utils"

import Wrapper from "./Wrapper"

export interface PageImageProps {
  title: string
  description: string
}

const Page = ({ title, description }: PageImageProps) => (
  <Wrapper>
    <div tw="h-full flex flex-col justify-start">
      <div
        tw="flex items-center justify-center"
        style={{ fontFamily: "cal", fontWeight: 300 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${absoluteUrl("profile.jpg")}`}
          width="350"
          alt="Profile picture"
        />
      </div>

      <div tw="relative flex text-[54px] w-full flex-col text-emphasis mt-auto">
        <div tw="flex w-[1040px]" style={{ fontFamily: "cal" }}>
          {title}
        </div>
        <div tw="flex mt-3 w-[1040px]" style={{ fontFamily: "inter" }}>
          {description}
        </div>
      </div>
    </div>
  </Wrapper>
)

export default Page
