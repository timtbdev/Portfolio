import * as z from "zod"

export const projectCreateSchema = z.object({
  title: z.string(),
})

export const projectRouteContextSchema = z.object({
  params: z.object({
    projectId: z.string(),
  }),
})

export const projectPatchSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  icon: z.string().url({ message: "Please upload your icon." }).optional(),
  url: z.string().url({ message: "Please enter a valid url." }).optional(),
  screenshot: z
    .string()
    .url({ message: "Please upload your screenshot." })
    .optional(),
  tags: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    })
    .optional(),
  components: z
    .string()
    .min(3, { message: "Components must be at least 3 characters." })
    .optional(),
  libraries: z
    .string()
    .min(3, { message: "Libraries must be at least 3 characters." })
    .optional(),
  backend: z
    .string()
    .min(3, { message: "Backend must be at least 3 characters." })
    .optional(),
  publishedAt: z.string().optional(),
})

export const projectSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  icon: z.string().url({ message: "Please upload your icon." }).optional(),
  url: z.string().url({ message: "Please enter a valid url." }).optional(),
  screenshot: z
    .string()
    .url({ message: "Please upload your screenshot." })
    .optional(),
  tags: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    })
    .optional(),
  components: z
    .string()
    .min(3, { message: "Components must be at least 3 characters." })
    .optional(),
  libraries: z
    .string()
    .min(3, { message: "Libraries must be at least 3 characters." })
    .optional(),
  backend: z
    .string()
    .min(3, { message: "Backend must be at least 3 characters." })
    .optional(),
  publishedAt: z
    .date({ required_error: "Published date is required." })
    .optional(),
})
