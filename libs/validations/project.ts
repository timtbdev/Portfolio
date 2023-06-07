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
  tags: z
    .array(
      z.object({
        name: z.string().min(3, "Tag must be at least 3 characters"),
      })
    )
    .optional(),
  categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    })
    .optional(),
  features: z
    .array(
      z.object({
        title: z
          .string()
          .min(3, { message: "Title must be at least 3 characters." }),
        description: z
          .string()
          .min(3, { message: "Description must be at least 3 characters." }),
      })
    )
    .optional(),
  publishedAt: z.string().optional(),
})

export const projectSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  icon: z.string().url({ message: "Please enter a valid url." }).optional(),
  url: z.string().url({ message: "Please enter a valid url." }).optional(),
  screenshot: z
    .string()
    .url({ message: "Please enter a valid url." })
    .optional(),
  tags: z
    .array(
      z.object({
        name: z.string().min(3, "Tag must be at least 3 characters"),
      })
    )
    .optional(),

  categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    })
    .optional(),
  features: z
    .array(
      z.object({
        title: z
          .string()
          .min(3, { message: "Title must be at least 3 characters." }),
        description: z
          .string()
          .min(3, { message: "Description must be at least 3 characters." }),
      })
    )
    .optional(),
  publishedAt: z
    .date({ required_error: "Published date is required." })
    .optional(),
})
