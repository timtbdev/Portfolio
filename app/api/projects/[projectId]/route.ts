import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import { getServerSession } from "next-auth"
import * as z from "zod"

const routeContextSchema = z.object({
  params: z.object({
    projectId: z.string(),
  }),
})

const projectPatchSchema = z.object({
  title: z.string(),
  icon: z.string().url(),
  url: z.string().url(),
  screenshot: z.string().url(),
  tags: z.string(),
  category: z.enum(["Android", "Web"]).default("Android"),
  components: z.string(),
  libraries: z.string(),
  backend: z.string(),
  publishedAt: z.string(),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

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
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

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
        tags: body.tags,
        category: body.category,
        components: body.components,
        libraries: body.libraries,
        backend: body.backend,
        publishedAt: body.publishedAt,
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
      userId: session?.user.id,
    },
  })

  return count > 0
}
