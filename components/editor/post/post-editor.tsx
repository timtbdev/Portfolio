"use client"

import { FC, useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Progress } from "@/components/ui/progress"
import ProjectEditorTitle from "@/components/ui/project-editor-title"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import UploadDragDropZone from "@/components/ui/upload-drag-drop-zone"
import UploadProgress from "@/components/ui/upload-progress"
import { toast } from "@/components/ui/use-toast"
import { postCategories } from "@/config/dashboard"
import { cn, initFirebase } from "@/libs/utils"
import { postBodySchema, postPatchSchema } from "@/libs/validations/post"
import EditorJS from "@editorjs/editorjs"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CategoryOnPost as Category,
  Post,
  TagOnPost as Tag,
} from "@prisma/client"
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
import * as z from "zod"

import "@/styles/editor.css"

initFirebase()

const storage = getStorage()

const storageRef = ref(storage, `post-image-${new Date().toISOString()}`)

type Image = {
  imageFile: Blob
}

type FormData = z.infer<typeof postPatchSchema>

interface PostEditorProps {
  post: Post & {
    tags: Tag[]
    categories: Category[]
  }
}

const PostEditor: FC<PostEditorProps> = ({ post }) => {
  const router = useRouter()

  const [imageUrl, setImageUrl] = useState<string>(
    post?.image || "/images/not-found.jpg"
  )

  let [progress, setProgress] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const onDrop = useCallback((acceptedFiles: any) => {
    // Upload files to storage
    const file = acceptedFiles[0]
    uploadImage({ imageFile: file })
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open: open,
  } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    onDrop,
  })

  // Upload image to Firebase storage
  const uploadImage = async ({ imageFile }: Image) => {
    try {
      setLoading(true)
      const uploadTask = uploadBytesResumable(storageRef, imageFile)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProgress(progress)
        },
        (error) => {
          console.log(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setLoading(false)
            setSuccess(true)
            form.setValue("image", downloadURL)
            setImageUrl(downloadURL)
          })
        }
      )
    } catch (e: any) {
      console.log(e.message)
      setLoading(false)
    }
  }

  const form = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
    defaultValues: {
      title: post?.title || "",
      description: post?.description || "",
      image: post?.image || "",
      imageCaption: post?.imageCaption || "",
      tags: post?.tags?.length > 0 ? post.tags : [{ name: "" }],
      categories:
        post?.categories?.length > 0
          ? post.categories.map((category) => category.title)
          : ["android", "nextjs"],
      published: post?.published || false,
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

  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const ref = useRef<EditorJS>()

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Embed = (await import("@editorjs/embed")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/list")).default
    const Code = (await import("@editorjs/code")).default
    const LinkTool = (await import("@editorjs/link")).default
    const InlineCode = (await import("@editorjs/inline-code")).default

    const body = postBodySchema.parse(post)

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      })
    }
  }, [post])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const blocks = await ref.current?.save()
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        image: data.image,
        imageCaption: data.imageCaption,
        content: blocks,
        tags: data.tags,
        categories: data.categories,
        published: data.published,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      console.log("Network Response", response)
      return toast({
        title: "Something went wrong.",
        description: "Your post was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your post has been updated.",
    })

    router.refresh()
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Post Title ---------------------------------- */}

          <ProjectEditorTitle
            title="Post title"
            description="Please provide a unique title."
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Input {...field} placeholder="Yout title" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Post Description ---------------------------------- */}

          <ProjectEditorTitle
            title="Post description"
            description="Please provide a short description for your post."
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Textarea
                      placeholder="Please provide some descriptions"
                      className="mt-1"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Upload - Image ---------------------------------- */}

          <ProjectEditorTitle
            title="Post image"
            description="Please drag and drop a file to upload"
          />

          <FormField
            control={form.control}
            name="image"
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
                      src={imageUrl}
                      onError={() => {
                        setImageUrl("/images/not-found.jpg")
                      }}
                      width={250}
                      height={250}
                      alt="icon"
                      priority
                    />
                  </div>

                  <div
                    {...getRootProps()}
                    className={cn(
                      "drag_drop_wrapper ml-4 flex basis-1/2 items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10",
                      { hidden: loading },
                      { hidden: success }
                    )}
                  >
                    <input hidden {...getInputProps()} />
                    {isDragActive ? (
                      <UploadDragDropZone active={true} />
                    ) : (
                      <UploadDragDropZone active={false} />
                    )}
                  </div>
                  {/* Upload progress */}
                  {loading && (
                    <>
                      <UploadProgress>
                        <Progress value={progress} className="w-[60%]" />
                      </UploadProgress>
                    </>
                  )}
                  {success && <UploadProgress done={true} />}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image caption ---------------------------------- */}

          <ProjectEditorTitle
            title="Image Caption"
            description="Please provide caption for your image."
          />
          <FormField
            control={form.control}
            name="imageCaption"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Input {...field} placeholder="Caption for your image" />
                  </FormControl>
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
                {postCategories.map((item, idx) => (
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

          {/* Content ---------------------------------- */}

          <ProjectEditorTitle
            title="Content"
            description="Please provide a content for your fost"
          />

          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
          <div
            id="editor"
            className="min-h-[500px] w-full max-w-3xl rounded-md border-dashed border-slate-500 bg-gray-50 text-left"
          />

          {/* Draft ---------------------------------- */}

          <ProjectEditorTitle
            title="Publish"
            description="Please choose status of your post."
          />

          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex w-full max-w-md flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormDescription>Publish?</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
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

export default PostEditor
