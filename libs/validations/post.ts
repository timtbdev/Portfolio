import * as z from "zod"

export const postCreateSchema = z.object({
  title: z.string(),
})

export const postRouteContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
})

export const postBodySchema = z.object({
  content: z.any().optional(),
})

export const postPatchSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z
    .string()
    .min(4, { message: "Description must be at least 4 characters." })
    .max(160, { message: "Description can not exceed 160 characters." })
    .optional(),
  image: z.string().url({ message: "Please upload your image." }).optional(),
  imageCaption: z.string().optional(),
  content: z.any().optional(),
  published: z.boolean().default(false).optional(),
  tags: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    })
    .optional(),
  categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    })
    .optional(),
})
