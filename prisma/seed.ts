import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const password = await hash("test", 12)

  const data = [
    {
      title: "Portfolio App 1.0",
      icon: "https://timtb.dev/images/projects/portfolio-app-01/icon.png",
      url: "https://github.com/timtbdev/Portfolio-App-1",
      screenshot:
        "https://timtb.dev/images/projects/portfolio-app-01/screen.png",
      tags: "Java, XML, JavaScript",
      components:
        "Multiple Activities, Fragment, AppCompat, RecyclerView, ViewPager",
      libraries: "Retrofit, OkHttp, Gson, Glide, Butterknife",
      backend: "Firebase Cloud Firestore, Firebase Cloud Functions",
      category: "Android",
      publishedAt: new Date("2019-08-01"),
    },
    {
      title: "Portfolio App 2.0",
      icon: "https://timtb.dev/images/projects/portfolio-app-02/icon.png",
      url: "https://github.com/timtbdev/Portfolio-App-2",
      screenshot:
        "https://timtb.dev/images/projects/portfolio-app-02/screen.png",
      tags: "Kotlin, XML, JavaScript",
      components:
        "Single Activity, Navigation, LiveData, ViewModel, DataBinding, Room, WorkManager, MotionLayout, Paging",
      libraries:
        "Koin, Kotlin Coroutines, Retrofit, OkHttp, Moshi, Coil, Leak Canary, Timber",
      backend: "Firebase Cloud Firestore, Firebase Cloud Functions",
      category: "Android",
      publishedAt: new Date("2019-10-01"),
    },
    {
      title: "Sign App",
      icon: "https://timtb.dev/images/projects/sign-app/icon.png",
      url: "https://github.com/timtbdev/sign-app",
      screenshot: "https://timtb.dev/images/projects/sign-app/screen.png",
      tags: "Kotlin, XML, JavaScript",
      components:
        "Jetpack Compose, Kotlin, Next.js, TypeScript, Tailwind Css, Prisma, PlanetScale, NextAuth.js",
      libraries:
        "Jetpack Compose, Material Design 3, Next.js, Tailwind Css, Prisma, PlanetScale",
      backend:
        "Next.js, App Router, React Server Components, TypeScript, Vercel Edge Functions",
      category: "Android",
      publishedAt: new Date("2023-05-01"),
    },
  ]

  const user = await prisma.user.upsert({
    where: { email: "your@email.com" },
    update: {},
    create: {
      email: "your@email.com",
      name: "Firstname Lastname",
      password,
    },
  })

  const projects = await prisma.project.createMany({
    data,
  })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
