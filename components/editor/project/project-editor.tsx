"use client"

import { FC, useCallback, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import FormTitle from "@/components/ui/form-title"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import UploadDragDropZone from "@/components/ui/upload-drag-drop-zone"
import UploadProgress from "@/components/ui/upload-progress"
import { toast } from "@/components/ui/use-toast"
import { categories, dbProjects, tags } from "@/config/dashboard"
import { cn, initFirebase } from "@/libs/utils"
import { projectSchema } from "@/libs/validations/project"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category, Project, Tag } from "@prisma/client"
import { format } from "date-fns"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import {
  Plus as AddIcon,
  CalendarIcon,
  Trash as RemoveIcon,
  Loader2 as SpinnerIcon,
  Upload as UpdateIcon,
} from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import { v4 } from "uuid"
import * as z from "zod"

initFirebase()

const storage = getStorage()

const storageRef = ref(storage, `projects/${v4()}`)

type Image = {
  imageFile: Blob
  type: string
}

type FormData = z.infer<typeof projectSchema>

interface ProjectEditorProps {
  project: Project & {
    tags: Tag[]
    categories: Category[]
  }
}

const ProjectEditor: FC<ProjectEditorProps> = ({ project }) => {
  const router = useRouter()

  // Urls for icon and screenshots
  const [iconUrl, setIconUrl] = useState<string>(
    project?.icon || "/images/not-found.jpg"
  )
  const [screenShotUrl, setScreenShotUrl] = useState<string>(
    project?.screenshot || "/images/not-found.jpg"
  )

  // Hooks for icon uploader
  let [progressIcon, setProgressIcon] = useState<number>(0)
  const [loadingIcon, setLoadingIcon] = useState(false)
  const [successIcon, setSuccessIcon] = useState(false)

  // Hooks for screenshot uploader
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
      if (type === "icon") {
        setLoadingIcon(true)
      } else {
        setLoadingScreenShot(true)
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
            console.log("File available at", downloadURL)
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
      components: project?.components || "",
      libraries: project?.libraries || "",
      backend: project?.backend || "",
      tags:
        project.tags.length > 0
          ? project.tags.map((tag) => tag.name)
          : ["java", "xml"],
      categories:
        project.categories.length > 0
          ? project.categories.map((category) => category.title)
          : ["android", "web"],
      publishedAt: project.publishedAt || new Date(Date.now()),
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
        categories: data.categories,
        components: data.components,
        libraries: data.libraries,
        backend: data.backend,
        publishedAt: data.publishedAt?.toISOString(),
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

    router.push(dbProjects.baseUrl)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Project Title ---------------------------------- */}

          <FormTitle
            title="Project title"
            description="Please provide a unique title for your project."
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Upload - Icon ---------------------------------- */}

          <FormTitle
            title="Project icon"
            description="Please drag and drop a file to upload"
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full max-w-xl flex-row">
                  <FormControl className="basis-3/4">
                    <div className="flex w-full max-w-xl flex-row">
                      <Input {...field} disabled />
                      <Button
                        onClick={openIcon}
                        className={cn(
                          "ml-2 basis-1/4",
                          { hidden: loadingIcon },
                          { hidden: successIcon }
                        )}
                      >
                        Select
                      </Button>
                    </div>
                  </FormControl>
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
                      <UploadDragDropZone active={true} />
                    ) : (
                      <UploadDragDropZone active={false} />
                    )}
                  </div>
                  {/* Upload progress */}
                  {loadingIcon && (
                    <>
                      <UploadProgress>
                        <Progress value={progressIcon} className="w-[60%]" />
                      </UploadProgress>
                    </>
                  )}
                  {successIcon && <UploadProgress done={true} />}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Project Url */}

          <FormTitle title="Url" description="Please provide a valid url." />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Input
                      {...field}
                      className="sm:max-w-md"
                      placeholder="https://example.com"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Upload - Screenshot ---------------------------------- */}

          <FormTitle
            title="Project screenshot"
            description="Please drag and drop a file to upload"
          />
          <FormField
            control={form.control}
            name="screenshot"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full max-w-xl flex-row space-x-2">
                  <FormControl className="basis-3/4">
                    <div className="flex w-full max-w-xl flex-row">
                      <Input {...field} disabled />
                      <Button
                        onClick={openScreenShot}
                        className={cn(
                          "ml-2 basis-1/4",
                          { hidden: loadingScreenShot },
                          { hidden: successScreenShot }
                        )}
                      >
                        Select
                      </Button>
                    </div>
                  </FormControl>
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
                      <UploadDragDropZone active={true} />
                    ) : (
                      <UploadDragDropZone active={false} />
                    )}
                  </div>
                  {/* Upload progress */}
                  {loadingScreenShot && (
                    <>
                      <UploadProgress>
                        <Progress
                          value={progressScreenShot}
                          className="w-[60%]"
                        />
                      </UploadProgress>
                    </>
                  )}
                  {successScreenShot && <UploadProgress done={true} />}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Project Tags ---------------------------------- */}

          <FormTitle title="Tags" description="You can choose multiple tags." />
          <FormField
            control={form.control}
            name="tags"
            render={() => (
              <FormItem>
                {tags.map((tag) => (
                  <FormField
                    key={v4()}
                    control={form.control}
                    name="tags"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={v4()}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(tag.value)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...(field.value || []),
                                      tag.value,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== tag.value
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {tag.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Project Categories ---------------------------------- */}

          <FormTitle
            title="Categories"
            description="You can choose multiple categories."
          />
          <FormField
            control={form.control}
            name="categories"
            render={() => (
              <FormItem>
                {categories.map((item, idx) => (
                  <FormField
                    key={v4()}
                    control={form.control}
                    name="categories"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={v4()}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.value)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...(field.value || []),
                                      item.value,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.value
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Project Components ---------------------------------- */}

          <FormTitle
            title="Components"
            description="Please provide components."
          />
          <FormField
            control={form.control}
            name="components"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Textarea
                      placeholder="Please provide components"
                      className="mt-1"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Project Libraries ---------------------------------- */}

          <FormTitle
            title="Libraries"
            description="Please provide libraries."
          />
          <FormField
            control={form.control}
            name="libraries"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Textarea
                      placeholder="Please provide libraries"
                      className="mt-1"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Project Backend ---------------------------------- */}

          <FormTitle
            title="Backend"
            description="Please provide bakcend stacks."
          />
          <FormField
            control={form.control}
            name="backend"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Textarea
                      placeholder="Please provide backend stacks."
                      className="mt-1"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormTitle
            title="Published date"
            description="Please choose a release date of your project. "
          />

          {/* Project release date ---------------------------------- */}

          <FormField
            control={form.control}
            name="publishedAt"
            render={({ field }) => (
              <FormItem>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full max-w-md bg-blue-600 hover:bg-blue-500"
          >
            {isSaving && <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />}
            {!isSaving && <UpdateIcon className="mr-2 h-4 w-4" />}
            Update
          </Button>
        </form>
      </Form>
    </>
  )
}

export default ProjectEditor
