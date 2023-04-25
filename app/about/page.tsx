import { Metadata } from "next"
import Image from "next/image"
import { Decorator, Photo, Text, Title } from "@/components/blog"
import { metaData } from "@/config/meta"
import { absoluteUrl, constructOgImageUri } from "@/libs/utils"
import FamilyImage from "@/public/family.jpg"
import MeImage from "@/public/me.jpg"

export const metadata: Metadata = {
  title: "About",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/about"),
    title: metaData.title,
    description: metaData.description,
    siteName: metaData.title,
    images: [
      {
        url: constructOgImageUri(
          metaData.ogTitle,
          "About",
          metaData.tags,
          "/about"
        ),
        width: 1200,
        height: 630,
        alt: metaData.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: metaData.ogTitle,
    description: metaData.description,
    images: [
      constructOgImageUri(metaData.ogTitle, "About", metaData.tags, "/about"),
    ],
    creator: metaData.author.twitterAddress,
  },
}

const AboutPage = () => {
  return (
    <>
      <div className="mx-auto max-w-5xl">
        <div className="relative mx-auto max-w-3xl border-b border-l border-dashed border-slate-500/50 px-6 py-4 md:border-y">
          <div className="absolute -top-1.5 left-0 h-2 w-full bg-gradient-to-r from-white from-20% via-white/5 to-white to-80% dark:from-slate-800 dark:from-20% dark:via-slate-800/5 dark:to-slate-800 dark:to-80%"></div>
          <div className="absolute -bottom-1.5 left-0 h-2 w-full bg-gradient-to-r from-white/10 via-white/5 to-white to-90% dark:from-slate-800/10 dark:via-slate-800/5 dark:to-slate-800 dark:to-90%"></div>
          <div className="absolute -left-1.5 bottom-0 h-full w-2 bg-gradient-to-t from-white/10 via-white/5 to-white dark:from-slate-800/10 dark:via-slate-800/5 dark:to-slate-800"></div>
          <h1 className="mx-auto text-left font-calsans text-3xl tracking-tight text-slate-900 dark:text-slate-100 md:text-center">
            Oh Hello there,
          </h1>
        </div>
        <div className="relative mx-auto max-w-3xl border-l border-dashed border-slate-500/50 px-6 py-4">
          <div className="absolute -left-1.5 bottom-0 h-full w-2 bg-gradient-to-b from-white/10 from-20% via-white/5 via-50% to-white to-80% dark:from-slate-800/10 dark:via-slate-800/5 dark:to-slate-800 dark:to-80%"></div>
          <span className="mb-4 block text-lg leading-8 text-slate-600 dark:text-slate-500">
            My name is Tim. I&apos;m an Android and Frontend developer based in
            Hayward, California. I was born and grew up in Mongolia, and studied
            Computer Science in Germany.
          </span>
          <div className="lg:aspect-square ring-photo shadow-photo relative mx-auto mt-4 flex aspect-[16/9] rounded-2xl text-center shadow-md ring-1 sm:aspect-[2/1] lg:max-w-3xl">
            <Image
              src={MeImage}
              alt="Profile photo"
              fill={true}
              priority={true}
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
          </div>
          <figcaption className="my-4 text-sm text-slate-400 dark:text-slate-500 sm:mb-6">
            And this is what I look like. Ulaanbaatar, Mongolia, 2015
          </figcaption>
        </div>

        <div className="relative mx-auto max-w-3xl border-b border-l border-dashed border-slate-500/50 px-6 py-4">
          <div className="absolute -bottom-1.5 left-0 h-2 w-full bg-gradient-to-r from-white/10 via-white/5 to-white to-90% dark:from-slate-800/10 dark:via-slate-800/5 dark:to-slate-800 dark:to-90%"></div>
          <div className="absolute -left-1.5 bottom-0 h-full w-2 bg-gradient-to-t from-white/10 via-white/5 to-white dark:from-slate-800/10 dark:via-slate-800/5 dark:to-slate-800"></div>
          <h1 className="font-calsans text-3xl tracking-tight text-slate-900 line-through decoration-blue-500 dark:text-slate-100 dark:decoration-sky-500">
            Build.
          </h1>
        </div>
        <div className="relative mx-auto max-w-3xl border-l border-dashed border-slate-500/50 px-6 py-4">
          <div className="absolute -left-1.5 bottom-0 h-full w-2 bg-gradient-to-b from-white/10 from-20% via-white/5 via-50% to-white to-80% dark:from-slate-800/10 dark:via-slate-800/5 dark:to-slate-800 dark:to-80%"></div>
          <span className="mb-4 block text-lg leading-8 text-slate-600 dark:text-slate-500">
            I started learning Android and Frontend development in 2017. I have
            been launched 2 mobile and 2 web apps, open-sourced them on GitHub.
            I enjoy making fun and smooth UI&apos;s with modern tools like
            Jetpack Compose, Next.js and Tailwind Css.
          </span>
          <span className="mb-4 block text-lg leading-8 text-slate-600 dark:text-slate-500">
            Currently, I&apos;ve been working on personal projects to improve my
            skills. Outside of Android and Frontend, I&apos;m a passionate
            runner, husband, and dad.
          </span>
          <div className="lg:aspect-square ring-photo shadow-photo relative mx-auto mt-4 flex aspect-[16/9] rounded-2xl text-center shadow-md ring-1 sm:aspect-[2/1] lg:max-w-3xl">
            <Image
              src={FamilyImage}
              alt="Wedding photo"
              fill={true}
              priority={true}
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
          </div>
          <figcaption className="my-4 text-sm text-slate-400 dark:text-slate-500 sm:mb-6">
            City hall wedding. Ulaanbaatar, Mongolia, 2023
          </figcaption>
        </div>

        <div className="relative mx-auto max-w-3xl border-b border-l border-dashed border-slate-500/50 px-6 py-4">
          <div className="absolute -bottom-1.5 left-0 h-2 w-full bg-gradient-to-r from-white/10 via-white/5 to-white to-90% dark:from-slate-800/10 dark:via-slate-800/5 dark:to-slate-800 dark:to-90%"></div>
          <div className="absolute -left-1.5 bottom-0 h-full w-2 bg-gradient-to-t from-white/10 via-white/5 to-white dark:from-slate-800/10 dark:via-slate-800/5 dark:to-slate-800"></div>
          <h1 className="font-calsans text-3xl tracking-tight text-slate-900 dark:text-slate-100">
            <span className="text-highlight-blue dark:text-highlight-sky text-slate-800 dark:text-slate-200">
              Connect.
            </span>
          </h1>
        </div>
        <div className="relative mx-auto max-w-3xl border-l border-dashed border-slate-500/50 px-6 py-4">
          <div className="absolute -left-1.5 bottom-0 h-full w-2 bg-gradient-to-b from-white/10 from-20% via-white/5 via-50% to-white to-80% dark:from-slate-800/10 dark:via-slate-800/5 dark:to-slate-800 dark:to-80%"></div>
          <span className="mb-4 block text-lg leading-8 text-slate-600 dark:text-slate-500">
            Anyway, that&apos;s enough about me.
          </span>
          <span className="mb-4 text-lg leading-8 text-slate-600 dark:text-slate-500">
            I&apos;m looking for an entry-level Android or Frontend engineering
            role. If you think I might be a good fit for your organization,
            shoot me an email at timtb.dev@gmail.com and let&apos;s chat.
          </span>
        </div>
      </div>
    </>
  )
}

export default AboutPage
