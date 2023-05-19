import { notFound, redirect } from "next/navigation"
import { ProjectEditor } from "@/components/editor/project"
import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import { getCurrentUser } from "@/libs/session"
import { Project, User } from "@prisma/client"

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
  )
}
