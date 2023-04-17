import { absoluteUrl } from "@/libs/utils"

import { Wrapper } from "./Wrappter"

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

interface OgImageProps {
  subTitle: string
  title: string
  description: string
  slug: string
}

export default function OgImage({
  subTitle,
  title,
  description,
  slug,
}: OgImageProps) {
  return (
    <>
      <Wrapper>
        <div tw="flex relative flex-col p-12 w-full h-full items-start">
          <div tw="flex flex-col flex-1 py-10">
            <div
              tw="flex text-xl font-bold text-blue-600 tracking-tight"
              style={{
                fontFamily: "Inter",
                fontWeight: "bold",
                fontSize: 36,
                marginBottom: 8,
              }}
            >
              {subTitle}
            </div>
            <div
              tw="flex leading-[1.1] text-[80px] font-bold tracking-tighter"
              style={{
                fontFamily: "Inter",
                fontWeight: "bolder",
                marginBottom: 16,
              }}
            >
              {title}
            </div>
            <div
              tw="flex leading-[1.1] text-gray-600 text-[30px] tracking-tighter"
              style={{
                fontFamily: "Inter",
                fontWeight: "normal",
              }}
            >
              {description}
            </div>
          </div>
          <div tw="flex w-full justify-between">
            <div tw="flex justify-start">
              <div
                tw="flex items-center font-bold text-3xl"
                style={{ fontFamily: "Inter", fontWeight: "bolder" }}
              >
                {absoluteUrl(slug)}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
