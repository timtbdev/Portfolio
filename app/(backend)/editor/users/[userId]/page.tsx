import Link from "next/link"
import { redirect } from "next/navigation"
import { UserEditor } from "@/components/editor/users"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { authOptions } from "@/libs/auth"
import { getCurrentUser } from "@/libs/session"
import { cn } from "@/libs/utils"
import { ArrowLeft } from "lucide-react"

interface EditorUserProps {
  params: { userId: string }
}

export default async function EditorUser({ params }: EditorUserProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
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
          Please edit or update your profile information.
        </p>
      </div>
      <Separator />
      <UserEditor
        userId={user.id}
        userName={user.name}
        userEmail={user.email}
        userImage={user.image}
      />
    </div>
  )
}
