import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { PostEditor } from "@/components/editor/post"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { dbPosts } from "@/config"
import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import { getCurrentUser } from "@/libs/session"
import { cn, removeLastChar } from "@/libs/utils"
import { Post, User } from "@prisma/client"
import { ArrowLeft } from "lucide-react"

async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  return await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
    include: {
      tags: true,
      categories: true,
    },
  })
}

interface EditorPostProps {
  params: { postId: string }
}

export default async function EditorPost({ params }: EditorPostProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const post = await getPostForUser(params.postId, user.id)

  if (!post) {
    notFound()
  }

  const title = removeLastChar(dbPosts.title)

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={dbPosts.baseUrl}
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
          Please edit or update your {title.toLowerCase()}
        </p>
      </div>
      <Separator />
      <PostEditor post={post} />
    </div>
  )
}
