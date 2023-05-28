import { FC } from "react"
import { redirect } from "next/navigation"
import {
  ProjecTableEmpty,
  ProjectTable,
} from "@/components/dashboard/tables/project"
import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import { getCurrentUser } from "@/libs/session"

interface DashboardPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function DashBoardPage({
  searchParams,
}: DashboardPageProps) {
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
      userId: user?.id,
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
        <ProjecTableEmpty userId={user.id} />
      )}
    </>
  )
}
