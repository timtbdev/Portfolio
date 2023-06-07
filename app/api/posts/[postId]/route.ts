import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import {
  postPatchSchema,
  postRouteContextSchema,
} from "@/libs/validations/post"
import { getServerSession } from "next-auth"
import * as z from "zod"

export async function DELETE(
  req: Request,
  context: z.infer<typeof postRouteContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = postRouteContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the project.
    await db.post.delete({
      where: {
        id: params.postId as string,
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
  context: z.infer<typeof postRouteContextSchema>
) {
  try {
    // Validate route params.
    const { params } = postRouteContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    console.log("Post-Api", JSON.stringify(json))
    const body = postPatchSchema.parse(json)

    // Update the post.
    // TODO: Implement sanitization for content.
    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
        imageCaption: body.imageCaption,
        content: body.content,
        published: body.published,
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
      },
      include: {
        tags: true,
        categories: true,
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

async function verifyCurrentUserHasAccessToPost(postId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.post.count({
    where: {
      id: postId,
      authorId: session?.user.id,
    },
  })

  return count > 0
}
