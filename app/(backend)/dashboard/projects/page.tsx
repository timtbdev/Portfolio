import { Metadata } from "next"
import { redirect } from "next/navigation"
import {
  ProjecTableEmpty,
  ProjectTable,
} from "@/components/dashboard/tables/project"
import { dbProjects } from "@/config"
import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import { getCurrentUser } from "@/libs/session"

export const metadata: Metadata = {
  title: dbProjects.title,
  description: dbProjects.description,
}

interface ProjectPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ProjectPage({ searchParams }: ProjectPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const totalProjects = await db.project.count()
  const perPage = 1
  const totalPages = Math.ceil(totalProjects / perPage)
  const page =
    typeof searchParams.page === "string" &&
    +searchParams.page > 1 &&
    +searchParams.page <= totalPages
      ? +searchParams.page
      : 1

  const projects = await db.project.findMany({
    where: {
      authorId: user?.id,
    },
    include: {
      categories: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: perPage,
    skip: (page - 1) * perPage,
  })

  return (
    <>
      {projects.length ? (
        <ProjectTable
          projects={projects}
          page={page}
          perPage={perPage}
          totalPages={totalPages}
          totalProjects={totalProjects}
        />
      ) : (
        <ProjecTableEmpty />
      )}
    </>
  )
}
