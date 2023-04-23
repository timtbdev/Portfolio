import { ProjectAttributes } from "types"

export const projects: ProjectAttributes[] = [
  {
    id: 1,
    title: "Sign Language",
    releaseDate: "2022-12-26",
    tags: ["Kotlin", "TypeScript"],
    icon: "/app-3/icon.png",
    iconDescription: "App icon",
    type: "Android App",
    url: "https://github.com/timtbdev/msign",
    features: [
      {
        description: "See MSL come alive with video-based learning material.",
        title: "MSL in Motion",
      },
      {
        description:
          "Engage in active learning with interactive exercises, quick lectures, and reviews.",
        title: "Interactive Learning",
      },
      {
        description:
          "Focus on learning the MSL most relevant to you with a modular curriculum.",
        title: "Time Efficient",
      },
    ],
    screenshot: "/app-3/screen.png",
  },
  {
    id: 2,
    title: "Portfolio App 2.0",
    releaseDate: "2019-10-26",
    tags: ["Kotlin", "XML", "JavaScript"],
    icon: "/app-1/icon.png",
    iconDescription: "App icon",
    type: "Android-App",
    url: "https://github.com/timtbdev/Portfolio-App-2",
    features: [
      {
        description:
          "Single Activity, Navigation, LiveData, ViewModel, DataBinding, Room, WorkManager, MotionLayout, Paging",
        title: "Components",
      },
      {
        description:
          "Koin, Kotlin Coroutines, Retrofit, OkHttp, Moshi, Coil, Leak Canary, Timber",
        title: "Libraries",
      },
      {
        description: "Firebase Cloud Firestore, Firebase Cloud Functions",
        title: "Backend",
      },
    ],
    screenshot: "/app-1/screen.png",
  },
  {
    id: 3,
    title: "Portfolio App 1.0",
    releaseDate: "2019-08-26",
    tags: ["Java", "XML", "JavaScript"],
    icon: "/app-2/icon.png",
    iconDescription: "App icon",
    type: "Android-App",
    url: "https://github.com/timtbdev/Portfolio-App-1",
    features: [
      {
        description:
          "Multiple Activities, Fragment, AppCompat, RecyclerView,  ViewPager",
        title: "Components",
      },
      {
        description: "Retrofit, OkHttp, Gson, Glide, Butterknife",
        title: "Libraries",
      },
      {
        description: "Firebase Cloud Firestore, Firebase Cloud Functions",
        title: "Backend",
      },
    ],
    screenshot: "/app-2/screen.png",
  },
]
