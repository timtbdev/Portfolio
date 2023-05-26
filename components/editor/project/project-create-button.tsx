"use client"

import { FC, useState } from "react"
import * as React from "react"
import { useRouter } from "next/navigation"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/libs/utils"
import { Plus as AddIcon, Loader2 as SpinnerIcon } from "lucide-react"

interface ProjectCreateButtonProps extends ButtonProps {}

const ProjectCreateButton: FC<ProjectCreateButtonProps> = ({
  className,
  variant,
  ...props
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled App",
      }),
    })

    console.log("Response-Post", response)

    setIsLoading(false)

    if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: "Limit of 3 posts reached.",
          description: "Please upgrade to the PRO plan.",
          variant: "destructive",
        })
      }

      return toast({
        title: "Something went wrong.",
        description: "Your project was not created. Please try again.",
        variant: "destructive",
      })
    }

    const project = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    router.push(`/editor/project/${project.id}`)
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
        New Project
      </button>
    </>
  )
}

export default ProjectCreateButton
