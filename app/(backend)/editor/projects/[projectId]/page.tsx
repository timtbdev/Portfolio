import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { ProjectEditor } from "@/components/editor/project"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { dbProjects } from "@/config"
import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import { getCurrentUser } from "@/libs/session"
import { cn, removeLastChar } from "@/libs/utils"
import { Project, User } from "@prisma/client"
import { ArrowLeft } from "lucide-react"

async function getProjectForUser(projectId: Project["id"], userId: User["id"]) {
  return await db.project.findFirst({
    where: {
      id: projectId,
      authorId: userId,
    },
    include: {
      tags: true,
      categories: true,
      features: true,
    },
  })
}

interface EditorProjectProps {
  params: { projectId: string }
}

export default async function EditorProject({ params }: EditorProjectProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const project = await getProjectForUser(params.projectId, user.id)

  if (!project) {
    notFound()
  }

  const title = removeLastChar(dbProjects.title)

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={dbProjects.baseUrl}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
      </div>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Please edit your {title.toLowerCase()}
        </p>
      </div>
      <Separator />
      <ProjectEditor project={project} />
    </div>
  )
}
