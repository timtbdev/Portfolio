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
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import ProjectEditorTitle from "@/components/ui/project-editor-title"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import UploadDragDropZone from "@/components/ui/upload-drag-drop-zone"
import UploadProgress from "@/components/ui/upload-progress"
import { toast } from "@/components/ui/use-toast"
import { dbProjects, projectCategories } from "@/config/dashboard"
import { cn, initFirebase } from "@/libs/utils"
import { projectSchema } from "@/libs/validations/project"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CategoryOnProject as Category,
  Feature,
  Project,
  TagOnProject as Tag,
} from "@prisma/client"
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
import { useFieldArray, useForm } from "react-hook-form"
import { v4 } from "uuid"
import * as z from "zod"

initFirebase()

const storage = getStorage()

function getStorageRef() {
  return ref(storage, `projects/${v4()}`)
}

type Image = {
  imageFile: Blob
  type: string
}

type FormData = z.infer<typeof projectSchema>

interface ProjectEditorProps {
  project: Project & {
    tags: Tag[]
    categories: Category[]
    features: Feature[]
  }
}

const ProjectEditor: FC<ProjectEditorProps> = ({ project }) => {
  const router = useRouter()

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
      if (type === "icon") {
        setLoadingIcon(true)
      } else {
        setLoadingScreenShot(true)
      }
      const uploadTask = uploadBytesResumable(getStorageRef(), imageFile)
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
      tags: project.tags.length > 0 ? project.tags : [{ name: "" }],
      categories:
        project.categories.length > 0
          ? project.categories.map((category) => category.title)
          : ["android", "web"],
      features:
        project.features.length > 0
          ? project.features
          : [{ title: "", description: "" }],
      publishedAt: project.publishedAt || new Date(Date.now()),
    },
  })

  const {
    fields: tagList,
    append: addTagList,
    remove: removeTagList,
  } = useFieldArray({
    name: "tags",
    control: form.control,
  })

  const {
    fields: featureList,
    append: addFeatureList,
    remove: removeFeatureList,
  } = useFieldArray({
    name: "features",
    control: form.control,
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
        features: data.features,
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

          <ProjectEditorTitle
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

          <ProjectEditorTitle
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
                    <Input {...field} disabled className="hidden" />
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

          <ProjectEditorTitle
            title="Url"
            description="Please provide a valid url."
          />
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

          <ProjectEditorTitle
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
                    <Input {...field} disabled className="hidden" />
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

          <ProjectEditorTitle
            title="Tags"
            description="You can add multiple tags."
          />
          <div className="flex w-full max-w-md flex-col">
            {tagList.map((field, index) => (
              <div className="flex w-full max-w-md flex-col">
                <FormField
                  control={form.control}
                  key={field.id + index}
                  name={`tags.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="mt-2 flex flex-row space-x-2">
                          <Input
                            placeholder="Please provide a tag"
                            className="w-full max-w-[340px]"
                            {...field}
                          />
                          {index !== 0 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="mt-1 text-red-600 hover:text-gray-900"
                              onClick={() => removeTagList(index)}
                            >
                              <RemoveIcon className="mr-2 h-4 w-4" />
                              Remove
                            </Button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button
              type="button"
              size="sm"
              className="mt-2 w-full max-w-[340px]"
              variant="outline"
              onClick={() => addTagList({ name: "" })}
            >
              <AddIcon className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>

          {/* Project Categories ---------------------------------- */}

          <ProjectEditorTitle
            title="Categories"
            description="You can choose multiple categories."
          />
          <FormField
            control={form.control}
            name="categories"
            render={() => (
              <FormItem>
                {projectCategories.map((item, idx) => (
                  <FormField
                    key={idx + item.label}
                    control={form.control}
                    name="categories"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.label + idx}
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

          {/* Project Features ---------------------------------- */}

          <ProjectEditorTitle
            title="Features"
            description="You can add multiple features."
          />
          <div className="flex w-full max-w-md flex-col">
            {featureList.map((field, index) => (
              <div
                key={field.id + index + 1}
                className="flex w-full max-w-md flex-col"
              >
                <FormField
                  control={form.control}
                  key={field.id + index}
                  name={`features.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="mt-2 flex flex-col">
                          <p className="text-sm font-semibold">Title</p>
                          <Input
                            placeholder="Please provide a title"
                            className="mt-1"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  key={field.id + index + 1}
                  name={`features.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="mt-2 flex flex-col">
                          <p className="text-sm font-semibold">Description</p>
                          <Textarea
                            placeholder="Please provide some descriptions"
                            className="mt-1"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {index !== 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2 text-red-600 hover:text-gray-900"
                    onClick={() => removeFeatureList(index)}
                  >
                    <RemoveIcon className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                )}
                <Separator className="mt-5" />
              </div>
            ))}

            <Button
              type="button"
              size="sm"
              variant="outline"
              className="mt-2"
              onClick={() => addFeatureList({ title: "", description: "" })}
            >
              <AddIcon className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>

          <ProjectEditorTitle
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
