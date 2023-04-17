import type { CSSProperties } from "react"
import { ImageResponse, NextRequest } from "next/server"
import OgImage from "@/components/ogImage/OgImage"
import { absoluteUrl } from "@/libs/utils"
import * as z from "zod"

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export const ogImageSchema = z.object({
  caption: z.string(),
  title: z.string(),
  author: z.string(),
})

export const config = {
  runtime: "edge",
}

const interRegular = fetch(
  new URL("../../public/fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

const interBold = fetch(
  new URL("../../public/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

export default async function handler(req: NextRequest) {
  try {
    const fontRegular = await interRegular
    const fontBold = await interBold

    const url = new URL(req.url)
    const values = ogImageSchema.parse(Object.fromEntries(url.searchParams))

    const { caption, title, author } = values

    return new ImageResponse(
      <OgImage caption={caption} title={title} author={author} />,

      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontRegular,
            weight: 400,
            style: "normal",
          },
          {
            name: "Inter",
            data: fontBold,
            weight: 700,
            style: "normal",
          },
        ],
      }
    )
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}
