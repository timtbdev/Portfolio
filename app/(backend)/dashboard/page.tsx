import { redirect } from "next/navigation"
import { Dashboard } from "@/components/dashboard"
import { dbPages, dbPosts, dbProjects } from "@/config/dashboard"
import { authOptions } from "@/libs/auth"
import { db } from "@/libs/db"
import { getCurrentUser } from "@/libs/session"

export default async function DashBoardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  //Projects
  const projectCount = await db.project.count({
    where: {
      authorId: user.id,
    },
  })

  // Posts
  const postCount = await db.post.count({
    where: {
      authorId: user.id,
    },
  })

  // Pages
  const pageCount = await db.page.count()

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Dashboard
          url={dbProjects.baseUrl}
          title={dbProjects.title}
          count={projectCount}
          empty={dbProjects.empty.title}
          description={dbProjects.description}
        />
        <Dashboard
          url={dbPosts.baseUrl}
          title={dbPosts.title}
          count={postCount}
          empty={dbPosts.empty.title}
          description={dbPosts.description}
        />
        <Dashboard
          url={dbPages.baseUrl}
          title={dbPages.title}
          count={pageCount}
          empty={dbPages.empty.title}
          description={dbPages.description}
        />
      </div>
    </>
  )
}
