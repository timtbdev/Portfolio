import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

const projectCreateSchema = z.object({
  title: z.string(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const projects = await db.project.findMany({
      select: {
        id: true,
        title: true,
        icon: true,
        category: true,
        publishedAt: true,
      },
      where: {
        userId: user.id,
      },
    })

    return new Response(JSON.stringify(projects))
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

    const body = projectCreateSchema.parse(json)

    const project = await db.project.create({
      data: {
        title: body.title,
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(project))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
