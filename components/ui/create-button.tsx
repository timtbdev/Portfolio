"use client"

import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/libs/utils"
import { Plus as AddIcon, Loader2 as SpinnerIcon } from "lucide-react"

interface CreateButtonProps extends ButtonProps {
  title: string
  apiUrl: string
  editUrl: string
}

const CreateButton: FC<CreateButtonProps> = ({
  title,
  apiUrl,
  editUrl,
  className,
  variant,
  ...props
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `Untitled ${title}`,
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: `Your ${title} was not created. Please try again.`,
        variant: "destructive",
      })
    }

    toast({
      title: "Success.",
      description: `You have created a new ${title}.`,
    })

    const item = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    router.push(editUrl + item.id)
  }

  return (
    <>
      <button
        onClick={onClick}
        className={cn(
          buttonVariants({ variant }),
          {
            "cursor-not-allowed opacity-60": isLoading,
          },
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <AddIcon className="mr-2 h-4 w-4" />
        )}
        New {title}
      </button>
      <AlertDialog open={isLoading} onOpenChange={setIsLoading}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Please wait ....
            </AlertDialogTitle>
            <AlertDialogDescription className="mx-auto text-center">
              <SpinnerIcon className="h-6 w-6 animate-spin" />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default CreateButton
