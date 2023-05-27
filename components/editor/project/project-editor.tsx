"use client"

import { FC, useCallback, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
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
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { cn, initFirebase } from "@/libs/utils"
import {
  CheckBadgeIcon,
  CloudArrowUpIcon,
  DocumentArrowDownIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import { Project } from "@prisma/client"
import { format } from "date-fns"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { CalendarIcon, ChevronDown, Loader2 as SpinnerIcon } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import * as z from "zod"

initFirebase()

const storage = getStorage()

type Image = {
  imageFile: Blob
  type: string
}

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

  const storageRefIcon = ref(
    storage,
    `${project.id}-icon-${new Date().toISOString()}`
  )
  const storageRefScreenShot = ref(
    storage,
    `${project.id}-screenshot-${new Date().toISOString()}`
  )

  const [iconUrl, setIconUrl] = useState<string>(
    project?.icon || "/images/not-found.jpg"
  )

  const [screenShotUrl, setScreenShotUrl] = useState<string>(
    project?.screenshot || "/images/not-found.jpg"
  )

  let [progressIcon, setProgressIcon] = useState<number>(0)

  const [loadingIcon, setLoadingIcon] = useState(false)

  const [successIcon, setSuccessIcon] = useState(false)

  let [progressScreenShot, setProgressScreenShot] = useState<number>(0)

  const [loadingScreenShot, setLoadingScreenShot] = useState(false)

  const [successScreenShot, setSuccessScreenShot] = useState(false)

  // Icon Drop
  const onDropIcon = useCallback((acceptedFiles: any) => {
    // Upload files to storage
    const file = acceptedFiles[0]
    const type = "icon"
    uploadImage({ imageFile: file, type })
  }, [])

  // ScreenShot Drop
  const onDropScreenShot = useCallback((acceptedFiles: any) => {
    // Upload files to storage
    const file = acceptedFiles[0]
    const type = "screenshot"
    uploadImage({ imageFile: file, type })
  }, [])

  // Icon
  const {
    getRootProps: getRootIconProps,
    getInputProps: getInputIconProps,
    isDragActive: isDragActiveIcon,
    open: openIcon,
  } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    onDrop: onDropIcon,
  })

  // screenshot
  const {
    getRootProps: getRootScreenShotProps,
    getInputProps: getInputScreenShotProps,
    isDragActive: isDragActiveScreenShot,
    open: openScreenShot,
  } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    onDrop: onDropScreenShot,
  })

  // Upload image to Firebase storage

  const uploadImage = async ({ imageFile, type }: Image) => {
    try {
      let storageRef = storageRefIcon
      if (type === "icon") {
        setLoadingIcon(true)
      } else {
        setLoadingScreenShot(true)
        storageRef = storageRefScreenShot
      }
      const uploadTask = uploadBytesResumable(storageRef, imageFile)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          type === "icon"
            ? setProgressIcon(progress)
            : setProgressScreenShot(progress)
        },
        (error) => {
          console.log(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            type === "icon"
              ? setLoadingIcon(false)
              : setLoadingScreenShot(false)
            type === "icon" ? setSuccessIcon(true) : setSuccessScreenShot(true)
            if (type === "icon") {
              form.setValue("icon", downloadURL)
              setIconUrl(downloadURL)
            } else {
              form.setValue("screenshot", downloadURL)
              setScreenShotUrl(downloadURL)
            }
          })
        }
      )
    } catch (e: any) {
      console.log(e.message)
      type === "icon" ? setLoadingIcon(false) : setLoadingScreenShot(false)
    }
  }

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
                <div className="flex w-full max-w-xl flex-row">
                  <FormControl className="basis-3/4">
                    <Input {...field} disabled />
                  </FormControl>
                  <Button
                    onClick={openIcon}
                    className={cn(
                      "dropzone_button ml-2 basis-1/4",
                      { hidden: loadingIcon },
                      { hidden: successIcon }
                    )}
                  >
                    Choose a file
                  </Button>
                </div>

                {/* Uploader */}
                <div className={cn("flex w-full max-w-xl flex-row")}>
                  <div className="flex basis-1/2 justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <Image
                      src={iconUrl}
                      onError={() => {
                        setIconUrl("/images/not-found.jpg")
                      }}
                      width={250}
                      height={250}
                      alt="icon"
                      priority
                    />
                  </div>

                  <div
                    {...getRootIconProps()}
                    className={cn(
                      "drag_drop_wrapper ml-4 flex basis-1/2 items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10",
                      { hidden: loadingIcon },
                      { hidden: successIcon }
                    )}
                  >
                    <input hidden {...getInputIconProps()} />
                    {isDragActiveIcon ? (
                      <div className="text-center">
                        <DocumentArrowDownIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <p className="pl-1">Drop your file here.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <p className="pl-1">Drag and drop a file here.</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Upload progress */}
                  {loadingIcon && (
                    <>
                      <div className="ml-4 flex basis-1/2 flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <CloudArrowUpIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <Progress value={progressIcon} className="w-[60%]" />
                        <div className="mt-4 flex text-sm font-semibold leading-6 text-slate-600">
                          <p className="pl-1">Uploading ...</p>
                        </div>
                      </div>
                    </>
                  )}
                  {successIcon && (
                    <>
                      <div className="ml-4 flex basis-1/2 flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <CheckBadgeIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm font-semibold leading-6 text-green-600">
                          <p className="pl-1">Successfully uploaded</p>
                        </div>
                      </div>
                    </>
                  )}
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
                <div className="flex w-full max-w-xl flex-row space-x-2">
                  <FormControl className="basis-3/4">
                    <Input {...field} disabled />
                  </FormControl>
                  <Button
                    onClick={openScreenShot}
                    className={cn(
                      "dropzone_button ml-2 basis-1/4",
                      { hidden: loadingScreenShot },
                      { hidden: successScreenShot }
                    )}
                  >
                    Choose a file
                  </Button>
                </div>

                {/* Uploader */}
                <div className={cn("flex w-full max-w-xl flex-row")}>
                  <div className="flex basis-1/2 justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <Image
                      src={screenShotUrl}
                      onError={() => {
                        setIconUrl("/images/not-found.jpg")
                      }}
                      width={250}
                      height={250}
                      alt="icon"
                      priority
                    />
                  </div>

                  <div
                    {...getRootScreenShotProps()}
                    className={cn(
                      "drag_drop_wrapper ml-4 flex basis-1/2 items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10",
                      { hidden: loadingScreenShot },
                      { hidden: successScreenShot }
                    )}
                  >
                    <input hidden {...getInputScreenShotProps()} />
                    {isDragActiveScreenShot ? (
                      <div className="text-center">
                        <DocumentArrowDownIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <p className="pl-1">Drop your file here.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <p className="pl-1">Drag and drop a file here.</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Upload progress */}
                  {loadingScreenShot && (
                    <>
                      <div className="ml-4 flex basis-1/2 flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <CloudArrowUpIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <Progress
                          value={progressScreenShot}
                          className="w-[60%]"
                        />
                        <div className="mt-4 flex text-sm font-semibold leading-6 text-slate-600">
                          <p className="pl-1">Uploading ...</p>
                        </div>
                      </div>
                    </>
                  )}
                  {successScreenShot && (
                    <>
                      <div className="ml-4 flex basis-1/2 flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <CheckBadgeIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm font-semibold leading-6 text-green-600">
                          <p className="pl-1">Successfully uploaded</p>
                        </div>
                      </div>
                    </>
                  )}
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
