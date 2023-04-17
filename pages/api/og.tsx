import { ImageResponse, NextRequest } from "next/server"
import OgImage from "@/components/ogImage/OgImage"
import * as z from "zod"

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export const ogImageSchema = z.object({
  title: z.string(),
  subTitle: z.string(),
  tags: z.string().array(),
  slug: z.string(),
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
    const { searchParams } = new URL(`${req.url}`)
    const fontRegular = await interRegular
    const fontBold = await interBold

    const { title, subTitle, tags, slug } = ogImageSchema.parse({
      title: searchParams.get("title"),
      subTitle: searchParams.get("subTitle"),
      tags: searchParams.getAll("tags"),
      slug: searchParams.get("slug"),
    })

    return new ImageResponse(
      <OgImage title={title} subTitle={subTitle} tags={tags} slug={slug} />,
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
