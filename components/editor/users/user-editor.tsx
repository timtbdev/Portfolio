"use client"

import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { OurFileRouter } from "@/app/api/uploadthing/core"
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
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { UploadButton } from "@uploadthing/react"
import { Loader2 as SpinnerIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
                <div className="flex w-full max-w-xl space-x-2">
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <UploadButton<OurFileRouter>
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      // Upload complete
                      res?.map((fileURLToPath) => {
                        form.setValue("image", fileURLToPath.fileUrl)
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
