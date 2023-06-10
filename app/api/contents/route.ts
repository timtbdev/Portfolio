import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import { contentCreateSchema } from "@/libs/validations/content"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const contents = await db.content.findMany({
      select: {
        id: true,
        title: true,
        image: true,
        imageCaption: true,
        type: true,
        description: true,
      },
      where: {
        authorId: user.id,
      },
    })

    return new Response(JSON.stringify(contents))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    const json = await req.json()

    const body = contentCreateSchema.parse(json)

    const content = await db.content.create({
      data: {
        title: body.title,
        authorId: session.user.id,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(content))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
