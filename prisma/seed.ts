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
      tags: [{ name: "Java" }, { name: "XML" }],
      features: [
        {
          title: "Components",
          description:
            "Multiple Activities, Fragment, AppCompat, RecyclerView, ViewPager",
        },
        {
          title: "Libraries",
          description: "Retrofit, OkHttp, Gson, Glide, Butterknife",
        },
        {
          title: "Backend",
          description: "Firebase Cloud Firestore, Firebase Cloud Functions",
        },
      ],
      categories: [{ title: "android" }, { title: "web" }],
      publishedAt: new Date("2019-08-01").toISOString,
    },
    {
      title: "Portfolio App 2.0",
      icon: "https://timtb.dev/images/projects/portfolio-app-02/icon.png",
      url: "https://github.com/timtbdev/Portfolio-App-2",
      screenshot:
        "https://timtb.dev/images/projects/portfolio-app-02/screen.png",

      tags: [{ name: "Kotlin" }, { name: "XML" }, { name: "JavaScript" }],
      features: [
        {
          title: "Components",
          description:
            "Single Activity, Navigation, LiveData, ViewModel, DataBinding, Room, WorkManager, MotionLayout, Paging",
        },
        {
          title: "Libraries",
          description:
            "Koin, Kotlin Coroutines, Retrofit, OkHttp, Moshi, Coil, Leak Canary, Timber",
        },
        {
          title: "Backend",
          description: "Firebase Cloud Firestore, Firebase Cloud Functions",
        },
      ],
      categories: [{ title: "android" }, { title: "web" }],
      publishedAt: new Date("2019-10-01"),
    },
    {
      title: "Sign App",
      icon: "https://timtb.dev/images/projects/sign-app/icon.png",
      url: "https://github.com/timtbdev/sign-app",
      screenshot: "https://timtb.dev/images/projects/sign-app/screen.png",

      tags: [{ name: "Kotlin" }, { name: "XML" }, { name: "JavaScript" }],
      features: [
        {
          title: "Components",
          description:
            "Jetpack Compose, Kotlin, Next.js, TypeScript, Tailwind Css, Prisma, PlanetScale, NextAuth.js",
        },
        {
          title: "Libraries",
          description:
            "Jetpack Compose, Material Design 3, Next.js, Tailwind Css, Prisma, PlanetScale",
        },
        {
          title: "Backend",
          description:
            "Next.js, App Router, React Server Components, TypeScript, Vercel Edge Functions",
        },
      ],
      categories: [{ title: "android" }, { title: "web" }],
      publishedAt: new Date("2023-05-01").toISOString,
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

  // await Promise.all(data.map(async (item) => { 
  //   await prisma.project.create({
  //     data: {
  //       title: item.title,
  //       icon: item.icon,
  //       url: item.url,
  //       screenshot: item.screenshot,
  //       tags: item.tags,
  //       features: item.features,
  //       categories: item.categories,
  //       publishedAt: item.publishedAt
  //     },
  //     include: {
  //       tags: true,
  //       features: true,
  //       categories: true
  //     }
  //   })
  // }))

}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
