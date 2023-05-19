import { redirect } from "next/navigation"
import {
  ProjecTableEmpty,
  ProjectTable,
} from "@/components/dashboard/tables/project"
import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import { getCurrentUser } from "@/libs/session"

const DashBoardPage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const projects = await db.project.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      title: true,
      category: true,
      publishedAt: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
  })

  return (
    <>
      {projects.length ? (
        <ProjectTable projects={projects} />
      ) : (
        <ProjecTableEmpty userId={user.id} />
      )}
    </>
  )
}

export default DashBoardPage
