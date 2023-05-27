import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { ProjectEditor } from "@/components/editor/project"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import { getCurrentUser } from "@/libs/session"
import { cn } from "@/libs/utils"
import { Project, User } from "@prisma/client"
import { ArrowLeft } from "lucide-react"

async function getProjectForUser(projectId: Project["id"], userId: User["id"]) {
  return await db.project.findFirst({
    where: {
      id: projectId,
      userId: userId,
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

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
      </div>
      <div>
        <h3 className="text-lg font-medium">Project</h3>
        <p className="text-sm text-muted-foreground">
          Please edit or update your project information.
        </p>
      </div>
      <Separator />
      <ProjectEditor
        project={{
          id: project.id,
          title: project.title,
          icon: project.icon,
          url: project.url,
          screenshot: project.screenshot,
          tags: project.tags,
          category: project.category,
          components: project.components,
          libraries: project.libraries,
          backend: project.backend,
          publishedAt: project.publishedAt,
        }}
      />
    </div>
  )
}
