import * as z from "zod"

export const contentCreateSchema = z.object({
  title: z.string(),
})

export const contentRouteContextSchema = z.object({
  params: z.object({
    contentId: z.string(),
  }),
})

export const contentPatchSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  image: z.string().url({ message: "Please upload your image." }).optional(),
  imageCaption: z
    .string()
    .min(3, { message: "Caption must be at least 3 characters." })
    .optional(),
  type: z.string().optional(),
  description: z
    .string()
    .min(4, { message: "Description must be at least 4 characters." })
    .optional(),
})
