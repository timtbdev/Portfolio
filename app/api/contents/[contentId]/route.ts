import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import {
  contentPatchSchema,
  contentRouteContextSchema,
} from "@/libs/validations/content"
import { getServerSession } from "next-auth"
import * as z from "zod"

export async function DELETE(
  req: Request,
  context: z.infer<typeof contentRouteContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = contentRouteContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.contentId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the project.
    await db.content.delete({
      where: {
        id: params.contentId as string,
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
  context: z.infer<typeof contentRouteContextSchema>
) {
  try {
    // Validate route params.
    const { params } = contentRouteContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.contentId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = contentPatchSchema.parse(json)

    // Update the post.
    // TODO: Implement sanitization for content.
    await db.content.update({
      where: {
        id: params.contentId,
      },
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
        imageCaption: body.imageCaption,
        type: body.type,
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

async function verifyCurrentUserHasAccessToPost(contentId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.content.count({
    where: {
      id: contentId,
      authorId: session?.user.id,
    },
  })

  return count > 0
}
