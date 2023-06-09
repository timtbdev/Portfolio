import * as z from "zod"

export const userRouteContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export const userPatchSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Please provide a valid email." }),
  image: z.string().url({ message: "Please provide a valid url." }),
  socials: z
    .array(
      z.object({
        title: z
          .string({ required_error: "Title is required." })
          .min(3, { message: "Title must contain at least 3 characters." }),
        description: z
          .string()
          .min(3, { message: "Description must be at least 3 characters." })
          .optional(),
        address: z
          .string()
          .min(3, { message: "Address must be at least 3 characters." })
          .optional(),
        url: z
          .string()
          .url({ message: "Please provide a valid url." })
          .optional(),
      })
    )
    .optional(),
})
