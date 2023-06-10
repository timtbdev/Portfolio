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
})
