import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { UserEditor } from "@/components/editor/user"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import { getCurrentUser } from "@/libs/session"
import { cn } from "@/libs/utils"
import { User } from "@prisma/client"
import { ArrowLeft } from "lucide-react"

async function getUser(userId: User["id"]) {
  return await db.user.findFirst({
    where: {
      id: userId,
    },
  })
}

interface EditorUserProps {
  params: { userId: string }
}

export default async function EditorUser({ params }: EditorUserProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const userData = await getUser(params.userId)

  if (!userData || userData.id !== user.id) {
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
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Please edit your profile.
        </p>
      </div>
      <Separator />
      <UserEditor user={userData} />
    </div>
  )
}
