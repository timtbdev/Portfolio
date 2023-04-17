import type { NextApiRequest } from "next"
import { Page } from "@/components/social/og/"
import { ImageResponse } from "@vercel/og"
import type { SatoriOptions } from "satori"
import { z } from "zod"

const calFont = fetch(
  new URL("../../public/fonts/cal.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

const interFont = fetch(
  new URL("../../public/fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

const interFontMedium = fetch(
  new URL("../../public/fonts/Inter-Medium.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

export const config = {
  runtime: "edge",
}

const pageSchema = z.object({
  imageType: z.literal("page"),
  title: z.string(),
  description: z.string(),
})

export default async function handler(req: NextApiRequest) {
  const { searchParams } = new URL(`${req.url}`)
  const imageType = searchParams.get("type")

  const [calFontData, interFontData, interFontMediumData] = await Promise.all([
    calFont,
    interFont,
    interFontMedium,
  ])
  const ogConfig = {
    width: 1200,
    height: 630,
    fonts: [
      { name: "inter", data: interFontData, weight: 400 },
      { name: "inter", data: interFontMediumData, weight: 500 },
      { name: "cal", data: calFontData, weight: 400 },
      { name: "cal", data: calFontData, weight: 600 },
    ] as SatoriOptions["fonts"],
  }

  switch (imageType) {
    case "page": {
      const { title, description } = pageSchema.parse({
        title: searchParams.get("title"),
        description: searchParams.get("description"),
        imageType,
      })
      const img = new ImageResponse(
        <Page title={title} description={description} />,
        ogConfig
      ) as {
        body: Buffer
      }

      return new Response(img.body, {
        status: 200,
        headers: { "Content-Type": "image/png" },
      })
    }

    default:
      return new Response("What you're looking for is not here..", {
        status: 404,
      })
  }
}
