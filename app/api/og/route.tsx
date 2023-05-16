import { ImageResponse } from "next/server"
import OgImage from "@/components/og/og-image"
import * as z from "zod"

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

const ogImageSchema = z.object({
  title: z.string(),
  subTitle: z.string(),
  tags: z.string().array(),
  slug: z.string(),
})

export const runtime = "edge"

const interBold = fetch(
  new URL("../../../public/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(`${req.url}`)
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
