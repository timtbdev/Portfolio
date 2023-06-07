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
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { cn, initFirebase } from "@/libs/utils"
import {
  CheckBadgeIcon,
  CloudArrowUpIcon,
  DocumentArrowDownIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { Loader2 as SpinnerIcon } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import * as z from "zod"

initFirebase()

const storage = getStorage()

const storageRef = ref(storage, `user-${new Date().toISOString()}`)
type Image = {
  imageFile: Blob
}

const userPatchSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  image: z.string().url({ message: "Please provide a valid image url." }),
})

type FormData = z.infer<typeof userPatchSchema>

interface UserEditorProps {
  userId: string
  userName?: string | null
  userEmail?: string | null
  userImage?: string | null
}

const UserEditor: FC<UserEditorProps> = ({
  userId,
  userName = "",
  userEmail = "",
  userImage = "",
}) => {
  const router = useRouter()

  const [imageUrl, setImageUrl] = useState<string>(
    userImage || "/images/not-found.jpg"
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
    resolver: zodResolver(userPatchSchema),
    defaultValues: {
      name: userName || "",
      email: userEmail || "",
      image: userImage || "",
    },
  })

  const [isSaving, setIsSaving] = useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/users/${userId}`, {
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
        description: "Your information was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your information has been updated.",
    })

    router.refresh()
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <div className="flex w-full max-w-xl flex-row">
                  <FormControl className="basis-3/4">
                    <Input {...field} disabled />
                  </FormControl>
                  <Button
                    onClick={open}
                    className={cn(
                      "dropzone_button ml-2 basis-1/4",
                      { hidden: loading },
                      { hidden: success }
                    )}
                  >
                    Choose a file
                  </Button>
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
                  {loading && (
                    <>
                      <div className="ml-4 flex basis-1/2 flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <CloudArrowUpIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <Progress value={progress} className="w-[60%]" />
                        <div className="mt-4 flex text-sm font-semibold leading-6 text-slate-600">
                          <p className="pl-1">Uploading ...</p>
                        </div>
                      </div>
                    </>
                  )}
                  {success && (
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Input {...field} className="sm:max-w-md" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {isSaving && <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />}
            Update
          </Button>
        </form>
      </Form>
    </>
  )
}

export default UserEditor
