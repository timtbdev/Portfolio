import type { NextApiRequest } from "next"
import { OgImagePage as Page } from "@/components/meta/OgImagePage"
import { ImageResponse } from "@vercel/og"
import type { SatoriOptions } from "satori"
import { z } from "zod"

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
  caption: z.string(),
  title: z.string(),
  description: z.string(),
  authorName: z.string(),
  authorImageUrl: z.string(),
})

export default async function handler(req: NextApiRequest) {
  try {
    const { searchParams } = new URL(`${req.url}`)

    const [interFontData, interFontMediumData] = await Promise.all([
      interFont,
      interFontMedium,
    ])
    const ogConfig = {
      width: 1200,
      height: 630,
      fonts: [
        { name: "inter", data: interFontData, weight: 400 },
        { name: "inter", data: interFontMediumData, weight: 500 },
      ] as SatoriOptions["fonts"],
    }

    const { caption, title, description, authorName, authorImageUrl } =
      pageSchema.parse({
        caption: searchParams.get("caption"),
        title: searchParams.get("title"),
        description: searchParams.get("description"),
        authorName: searchParams.get("auhorName"),
        authorImageUrl: searchParams.get("auhorImageUrl"),
      })

    const img = new ImageResponse(
      (
        <Page
          caption={caption}
          title={title}
          description={description}
          author={{ name: authorName, image: authorImageUrl }}
        />
      ),
      ogConfig
    ) as {
      body: Buffer
    }

    return new Response(img.body, {
      status: 200,
      headers: { "Content-Type": "image/png" },
    })
  } catch (error) {
    return new Response("What you're looking for is not here..", {
      status: 404,
    })
  }
}
