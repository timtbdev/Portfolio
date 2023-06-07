import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import {
  projectPatchSchema,
  projectRouteContextSchema,
} from "@/libs/validations/project"
import { getServerSession } from "next-auth"
import * as z from "zod"

export async function DELETE(
  req: Request,
  context: z.infer<typeof projectRouteContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = projectRouteContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.projectId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the project.
    await db.project.delete({
      where: {
        id: params.projectId as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof projectRouteContextSchema>
) {
  try {
    // Validate route params.
    const { params } = projectRouteContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.projectId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()

    const body = projectPatchSchema.parse(json)

    // Update the post.
    // TODO: Implement sanitization for content.
    await db.project.update({
      where: {
        id: params.projectId,
      },
      data: {
        title: body.title,
        icon: body.icon,
        url: body.url,
        screenshot: body.screenshot,
        tags: {
          deleteMany: {},
          create: body.tags?.map((tag) => {
            return {
              name: tag.name,
            }
          }),
        },
        categories: {
          set: [],
          connectOrCreate: body.categories?.map((category) => {
            return {
              where: { title: category },
              create: { title: category },
            }
          }),
        },
        features: {
          deleteMany: {},
          create: body.features?.map((feature) => {
            return {
              description: feature.description,
              title: feature.title,
            }
          }),
        },
        publishedAt: body.publishedAt,
      },
      include: {
        tags: true,
        categories: true,
        features: true,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToPost(projectId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.project.count({
    where: {
      id: projectId,
      authorId: session?.user.id,
    },
  })

  return count > 0
}
