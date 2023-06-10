import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { ContentEditor } from "@/components/editor/content"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { dbContents } from "@/config/dashboard"
import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import { getCurrentUser } from "@/libs/session"
import { cn, removeLastChar } from "@/libs/utils"
import { Content, User } from "@prisma/client"
import { ArrowLeft } from "lucide-react"

async function getContentForUser(contentId: Content["id"], userId: User["id"]) {
  return await db.content.findFirst({
    where: {
      id: contentId,
      authorId: userId,
    },
  })
}

interface EditorContentProps {
  params: { contentId: string }
}

export default async function EditorContent({ params }: EditorContentProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const content = await getContentForUser(params.contentId, user.id)

  if (!content) {
    notFound()
  }

  const title = removeLastChar(dbContents.title)

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={dbContents.baseUrl}
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
      <ContentEditor content={content} />
    </div>
  )
}
