import { Wrapper } from "./Wrappter"

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

interface OgImageProps {
  caption: string
  title: string
  description?: string
  website?: string
  author: string
  avatar?: string
}

export default function OgImage({
  caption,
  title,
  description,
  website,
  author,
  avatar,
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
              {caption}
            </div>
            <div
              tw="flex leading-[1.1] text-[80px] font-bold tracking-tighter"
              style={{
                fontFamily: "Inter",
                fontWeight: "bolder",
                marginLeft: "-3px",
              }}
            >
              {title}
            </div>
          </div>
          <div tw="flex w-full justify-between">
            <div tw="flex justify-start">
              <div
                tw="flex items-center font-bold text-3xl"
                style={{ fontFamily: "Inter", fontWeight: "bolder" }}
              >
                {author}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
