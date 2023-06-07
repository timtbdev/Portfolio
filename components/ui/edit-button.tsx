"use client"

import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ButtonProps } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import {
  MoreVertical as ElipsisIcon,
  Loader2 as SpinnerIcon,
  Trash as TrashIcon,
} from "lucide-react"

async function deletePost(id: string, title: string, apiUrl: string) {
  console.log("DELETE-RESPONSE", apiUrl + id)
  const response = await fetch(apiUrl + id, {
    method: "DELETE",
  })

  if (!response?.ok) {
    return toast({
      title: "Something went wrong.",
      description: `Your ${title} was not deleted. Please try again.`,
      variant: "destructive",
    })
  }

  toast({
    title: "Success",
    description: `Your ${title} was deleted.`,
  })

  return true
}

interface EditButtonProps extends ButtonProps {
  id: string
  title: string
  apiUrl: string
  editUrl: string
}

const EditButton: FC<EditButtonProps> = ({ id, title, apiUrl, editUrl }) => {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)
  const [showLoadingAlert, setShowLoadingAlert] = useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <ElipsisIcon className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="font-sans">
          <DropdownMenuItem>
            <a
              className="flex w-full"
              onClick={() => {
                router.push(editUrl + id)
                setShowLoadingAlert(true)
              }}
            >
              Edit
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showLoadingAlert} onOpenChange={setShowLoadingAlert}>
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
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure, you want to delete this {title}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deletePost(id, title, apiUrl)

                if (deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  router.refresh()
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <TrashIcon className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default EditButton
