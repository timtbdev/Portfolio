import { absoluteUrl } from "@/libs/utils"

import { Wrapper } from "./Wrappter"

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

interface OgImageProps {
  title: string
  subTitle: string
  tags: Array<string>
  slug: string
}

export default function OgImage({ title, subTitle, tags, slug }: OgImageProps) {
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
            <div tw="flex">
              {tags.slice(0, 3).map((tag) => (
                <div
                  tw="flex bg-blue-500 text-[30px] text-white"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: "normal",
                    alignItems: "center",
                    borderRadius: 100,
                    display: "flex",
                    height: 48,
                    marginRight: 16,
                    paddingLeft: 16,
                    paddingRight: 20,
                  }}
                  key={tag}
                >
                  <div tw="flex mr-2 text-gray-300">#</div>
                  <div tw="flex">{tag}</div>
                </div>
              ))}
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
