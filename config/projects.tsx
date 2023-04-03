import { Project } from "types"

export const projects: Project[] = [
    {
        id: 1,
        title: "Mongolian Sign Language",
        releaseDate: "2022-12-26",
        icon: "/placeholder/sign_icon.png",
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
        images: ["/placeholder/s.png", "/placeholder/s.png", "/placeholder/s.png"],
        text: "This app aims to promote MSL learning in the hearing community to improve everyday communication accessibility between the Deaf and hearing",
    },
    {
        id: 2,
        title: "Portfolio App 2.0",
        releaseDate: "2019-10-26",
        icon: "/app-1/icon.png",
        iconDescription: "App icon",
        type: "Android-App",
        url: "https://github.com/timtbdev/Portfolio-App-2",
        features: [
            {
                description: "Single Activity, Navigation, LiveData, ViewModel, DataBinding, Room, WorkManager, MotionLayout, Paging",
                title: "Components",
            },
            {
                description: "Koin, Kotlin Coroutines, Retrofit, OkHttp, Moshi, Coil, Leak Canary, Timber",
                title: "Libraries",
            },
            {
                description: "Firebase Cloud Firestore, Firebase Cloud Functions",
                title: "Backend & Design Tools",
            },
        ],
        images: ["/app-1/s01.png", "/app-1/s02.png", "/app-1/s03.png", "/app-1/s04.png", "/app-1/s05.png"],
        text: "It's the second version of my portfolio app. It was written in Kotlin and built with Android Jetpack components and MVVM design architecture, and applied several best practices.",
    },
    {
        id: 3,
        title: "Portfolio App 1.0",
        releaseDate: "2019-08-26",
        icon: "/app-2/icon.png",
        iconDescription: "App icon",
        type: "Android-App",
        url: "https://github.com/timtbdev/Portfolio-App-1",
        features: [
            {
                description: "Multiple Activities, Fragment, AppCompat, RecyclerView,  ViewPager",
                title: "Components",
            },
            {
                description: "Retrofit, OkHttp, Gson, Glide, Butterknife",
                title: "Libraries",
            },
            {
                description: "Firebase Cloud Firestore, Firebase Cloud Functions",
                title: "Backend & Design Tools",
            },
        ],
        images: ["/app-2/s01.png", "/app-2/s02.png", "/app-2/s03.png", "/app-2/s04.png"],
        text: "",
    },
];