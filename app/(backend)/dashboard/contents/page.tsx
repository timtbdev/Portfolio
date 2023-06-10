import { Metadata } from "next"
import { redirect } from "next/navigation"
import {
  ContentTable,
  ContentTableEmpty,
} from "@/components/dashboard/tables/content"
import { dbContents } from "@/config"
import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import { getCurrentUser } from "@/libs/session"

export const metadata: Metadata = {
  title: dbContents.title,
  description: dbContents.description,
}

interface ContentsPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ContentsPage({
  searchParams,
}: ContentsPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const totalContents = await db.content.count()
  const perPage = 1
  const totalPages = Math.ceil(totalContents / perPage)
  const page =
    typeof searchParams.page === "string" &&
    +searchParams.page > 1 &&
    +searchParams.page <= totalPages
      ? +searchParams.page
      : 1

  const contents = await db.content.findMany({
    where: {
      authorId: user?.id,
    },
    select: {
      id: true,
      title: true,
      type: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: perPage,
    skip: (page - 1) * perPage,
  })

  return (
    <>
      {contents.length ? (
        <ContentTable
          contents={contents}
          page={page}
          perPage={perPage}
          totalPages={totalPages}
          totalContents={totalContents}
        />
      ) : (
        <ContentTableEmpty />
      )}
    </>
  )
}
