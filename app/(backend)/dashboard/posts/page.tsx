import { Metadata } from "next"
import { redirect } from "next/navigation"
import { PostTable, PostTableEmpty } from "@/components/dashboard/tables/post"
import { dbPosts } from "@/config"
import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import { getCurrentUser } from "@/libs/session"

export const metadata: Metadata = {
  title: dbPosts.title,
  description: dbPosts.description,
}

interface PostsPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const totalPosts = await db.post.count()
  const perPage = 1
  const totalPages = Math.ceil(totalPosts / perPage)
  const page =
    typeof searchParams.page === "string" &&
    +searchParams.page > 1 &&
    +searchParams.page <= totalPages
      ? +searchParams.page
      : 1

  const posts = await db.post.findMany({
    where: {
      authorId: user?.id,
    },
    select: {
      id: true,
      title: true,
      image: true,
      content: true,
      published: true,
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
      {posts.length ? (
        <PostTable
          posts={posts}
          page={page}
          perPage={perPage}
          totalPages={totalPages}
          totalPosts={totalPosts}
        />
      ) : (
        <PostTableEmpty />
      )}
    </>
  )
}
