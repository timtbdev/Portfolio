import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import { getServerSession } from "next-auth"
import * as z from "zod"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

const userPatchSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  image: z.string().url(),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session?.user || params.userId !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = userPatchSchema.parse(json)

    // Update the user.
    // TODO: Implement sanitization for content.
    await db.user.update({
      where: {
        id: params.userId,
      },
      data: {
        name: body.name,
        email: body.email,
        image: body.image,
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
