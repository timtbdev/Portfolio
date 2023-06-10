"use client"

import { FC, useCallback, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import FormTitle from "@/components/ui/form-title"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import UploadDragDropZone from "@/components/ui/upload-drag-drop-zone"
import UploadProgress from "@/components/ui/upload-progress"
import { toast } from "@/components/ui/use-toast"
import { dbContents } from "@/config/dashboard"
import { cn, initFirebase } from "@/libs/utils"
import { contentPatchSchema } from "@/libs/validations/content"
import { zodResolver } from "@hookform/resolvers/zod"
import { Content } from "@prisma/client"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { Loader2 as SpinnerIcon, Upload as UpdateIcon } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import { v4 } from "uuid"
import * as z from "zod"

initFirebase()

const storage = getStorage()

const storageRef = ref(storage, `contents/${v4()}`)

type Image = {
  imageFile: Blob
}

type FormData = z.infer<typeof contentPatchSchema>

interface ContentEditorProps {
  content: Content
}

const ContentEditor: FC<ContentEditorProps> = ({ content }) => {
  const router = useRouter()

  const [imageUrl, setImageUrl] = useState<string>(
    content?.image || "/images/not-found.jpg"
  )

  let [progress, setProgress] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const onDrop = useCallback((acceptedFiles: any) => {
    // Upload files to storage
    const file = acceptedFiles[0]
    uploadImage({ imageFile: file })
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
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
            form.setValue("image", downloadURL)
            setImageUrl(downloadURL)
            setLoading(false)
            setSuccess(true)
          })
        }
      )
    } catch (e: any) {
      console.log(e.message)
      setLoading(false)
    }
  }

  const form = useForm<FormData>({
    resolver: zodResolver(contentPatchSchema),
    defaultValues: {
      title: content?.title || "",
      image: content?.image || "",
      imageCaption: content?.imageCaption || "",
      type: content?.type || "about",
      description: content?.description || "",
    },
  })

  const [isSaving, setIsSaving] = useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/contents/${content.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        image: data.image,
        imageCaption: data.imageCaption,
        type: data.type,
        description: data.description,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      console.log("Network Response", response)
      return toast({
        title: "Something went wrong.",
        description: "Your content was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your content has been updated.",
    })

    router.push(dbContents.baseUrl)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Page Title ---------------------------------- */}

          <FormTitle
            title="Title"
            description="Please provide a unique title for your content."
          />
          <FormField
            key={v4()}
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

          <FormTitle
            title="Image"
            description="Please drag and drop or select a file to upload"
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full max-w-xl flex-row">
                  <FormControl className="basis-3/4">
                    <div className="flex w-full max-w-xl flex-row">
                      <Input
                        {...field}
                        disabled
                        placeholder="Please provide a valide url."
                      />
                      <Button
                        onClick={open}
                        className={cn(
                          "ml-2 basis-1/4",
                          { hidden: loading },
                          { hidden: success }
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

          <FormTitle
            title="Image Caption"
            description="Please provide a image caption."
          />
          <FormField
            control={form.control}
            name="imageCaption"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Please provide a image caption."
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description ---------------------------------- */}

          <FormTitle
            title="Description"
            description="Please provide description."
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Textarea
                      placeholder="Please provide description."
                      className="mt-1"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type ---------------------------------- */}

          <FormTitle title="Type" description="Please select a type" />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full max-w-md space-x-2">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type of the content" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="font-sans">
                      <SelectItem value="about">About</SelectItem>
                      <SelectItem value="blog">Blog</SelectItem>
                      <SelectItem value="contact">Contact</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
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

export default ContentEditor
