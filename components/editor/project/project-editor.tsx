"use client"

import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { OurFileRouter } from "@/app/api/uploadthing/core"
import { Button, buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/libs/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Project } from "@prisma/client"
import { UploadButton } from "@uploadthing/react"
import { format } from "date-fns"
import { CalendarIcon, ChevronDown, Loader2 as SpinnerIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const projectSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  icon: z.string().url({ message: "Please enter a valid url." }),
  url: z.string().url({ message: "Please enter a valid url." }),
  screenshot: z.string().url({ message: "Please enter a valid url." }),
  tags: z.string().min(3, {
    message: "Tag must be at least 3 characters, and seperated by commas.",
  }),
  category: z
    .enum(["Android", "Web"], {
      invalid_type_error: "Select a category",
      required_error: "Please select a category.",
    })
    .default("Android"),
  components: z.string().max(160).min(4),
  libraries: z.string().max(160).min(4),
  backend: z.string().max(160).min(4),
  publishedAt: z.date({ required_error: "Published date is required." }),
})

type FormData = z.infer<typeof projectSchema>

interface ProjectEditorProps {
  project: Pick<
    Project,
    | "id"
    | "title"
    | "icon"
    | "url"
    | "screenshot"
    | "tags"
    | "category"
    | "components"
    | "libraries"
    | "backend"
    | "publishedAt"
  >
}

const ProjectEditor: FC<ProjectEditorProps> = ({ project }) => {
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      icon: project?.icon || "",
      url: project?.url || "",
      screenshot: project?.screenshot || "",
      tags: project?.tags || "",
      category: project?.category === "Android" ? "Android" : "Web",
      components: project?.components || "",
      libraries: project?.libraries || "",
      backend: project?.backend || "",
      publishedAt: project.publishedAt,
    },
  })

  const [isSaving, setIsSaving] = useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        icon: data.icon,
        url: data.url,
        screenshot: data.screenshot,
        tags: data.tags,
        category: data.category,
        components: data.components,
        libraries: data.libraries,
        backend: data.backend,
        publishedAt: data.publishedAt.toISOString(),
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      console.log("Network Response", response)
      return toast({
        title: "Something went wrong.",
        description: "Your project was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your project has been updated.",
    })

    router.refresh()
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <div className="flex w-full max-w-xl space-x-2">
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <UploadButton<OurFileRouter>
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      // Upload complete
                      res?.map((fileURLToPath) => {
                        form.setValue("icon", fileURLToPath.fileUrl)
                        field.value = fileURLToPath.fileUrl
                      })
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`)
                    }}
                  />
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url</FormLabel>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Input {...field} className="sm:max-w-md" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="screenshot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Screenshot</FormLabel>
                <div className="flex w-full max-w-xl space-x-2">
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <UploadButton<OurFileRouter>
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      // Upload complete
                      res?.map((fileURLToPath) => {
                        form.setValue("screenshot", fileURLToPath.fileUrl)
                        field.value = fileURLToPath.fileUrl
                      })
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`)
                    }}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Input {...field} className="sm:max-w-md" />
                  </FormControl>
                </div>
                <FormDescription>
                  Tags must be seperated by commas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <select
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-[200px] appearance-none bg-transparent font-normal"
                      )}
                      {...field}
                    >
                      <option value="Android">Android</option>
                      <option value="Web">Web</option>
                    </select>
                  </FormControl>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50" />
                </div>
                <FormDescription>
                  Choose a category for your project
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="components"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Components</FormLabel>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                </div>
                <FormDescription>
                  All components must be seperated by commas.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="libraries"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Libraries</FormLabel>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                </div>
                <FormDescription>
                  All libraries must be seperated by commas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="backend"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Backend</FormLabel>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                </div>
                <FormDescription>
                  All backend technologies must be seperated by commas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publishedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Published at:</FormLabel>
                <div className="flex w-full max-w-md space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 font-sans"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormDescription>Please pick a published date.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isSaving && <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />}
            Update project
          </Button>
        </form>
      </Form>
    </>
  )
}

export default ProjectEditor
