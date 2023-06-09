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
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import FormTitle from "@/components/ui/form-title"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import UploadDragDropZone from "@/components/ui/upload-drag-drop-zone"
import UploadProgress from "@/components/ui/upload-progress"
import { toast } from "@/components/ui/use-toast"
import { cn, initFirebase } from "@/libs/utils"
import { userPatchSchema } from "@/libs/validations/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
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

const storageRef = ref(storage, `user/${v4()}`)
type Image = {
  imageFile: Blob
}

type FormData = z.infer<typeof userPatchSchema>

interface UserEditorProps {
  user: User
}

const UserEditor: FC<UserEditorProps> = ({ user }) => {
  const router = useRouter()

  const [imageUrl, setImageUrl] = useState<string>(
    user?.image || "/images/not-found.jpg"
  )

  let [progress, setProgress] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // React Dropzone setup with firebase storage upload function
  const onDrop = useCallback((acceptedFiles: any) => {
    // Upload files to storage
    const file = acceptedFiles[0]
    uploadImage({ imageFile: file })
  }, [])

  // React Dropzone setup
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
    resolver: zodResolver(userPatchSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      image: user.image || "",
    },
  })

  const [isSaving, setIsSaving] = useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        image: data.image,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      console.log("Network Response", response)
      return toast({
        title: "Something went wrong.",
        description: "Your profile was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your profile has been updated.",
    })

    router.push("/dashboard")
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Name */}

          <FormTitle title="Name" description="Please provide your name." />
          <FormField
            control={form.control}
            name="name"
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

          {/* Profile image */}

          <FormTitle
            title="Profile Image"
            description="Please select or drag and drop a file to upload a image."
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full max-w-xl flex-row">
                  <FormControl className="basis-3/4">
                    <div className="flex w-full max-w-xl flex-row">
                      <Input {...field} disabled />
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

          {/* Email */}

          <FormTitle
            title="Email"
            description="Please provide a valid email."
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Input
                      {...field}
                      className="sm:max-w-md"
                      placeholder="email@example.com"
                    />
                  </FormControl>
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

export default UserEditor
