import type { NextApiRequest } from "next"
import { OgImagePage as Page } from "@/components/meta/OgImagePage"
import { ImageResponse } from "next/server"
import type { SatoriOptions } from "satori"
import { z } from "zod"

const interFont = fetch(
  new URL("../../public/fonts/Inter-Regular.ttf", import.meta.url)
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

    const [interFontData] = await Promise.all([
      interFont
    ])
    const ogConfig = {
      width: 1200,
      height: 630,
      fonts: [
        { name: "inter", data: interFontData, weight: 400 }
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
