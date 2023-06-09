import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import {
  userPatchSchema,
  userRouteContextSchema,
} from "@/libs/validations/user"
import { getServerSession } from "next-auth"
import * as z from "zod"

export async function PATCH(
  req: Request,
  context: z.infer<typeof userRouteContextSchema>
) {
  try {
    // Validate route params.
    const { params } = userRouteContextSchema.parse(context)

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
        socials: {
          deleteMany: {},
          create: body.socials?.map((social) => {
            return {
              title: social.title,
              description: social.description,
              url: social.url,
              address: social.address,
            }
          }),
        },
      },
      include: {
        socials: true,
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
