import { Metadata } from "next"
import Image from "next/image"
import { Mdx } from "@/components/mdx"
import { metaData } from "@/config/meta"
import { absoluteUrl, constructOgImageUri } from "@/libs/utils"
import { allPages } from "contentlayer/generated"
import Balancer from "react-wrap-balancer"

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

const AboutPage = async () => {
  const page = allPages.find((page) => page.slugAsParams === "about")

  if (!page) {
    return null
  }

  return (
    <>
      <div className="mx-auto max-w-5xl">
        <div className="relative mx-auto max-w-3xl border-b border-l border-dashed border-slate-500/50 px-6 py-4 md:border-y">
          <div className="absolute -top-1.5 left-0 h-2 w-full bg-gradient-to-r from-white from-20% via-white/5 to-white to-80% dark:from-slate-800 dark:from-20% dark:via-slate-800/5 dark:to-slate-800 dark:to-80%"></div>
          <div className="absolute -bottom-1.5 left-0 h-2 w-full bg-gradient-to-r from-white/10 via-white/5 to-white to-90% dark:from-slate-800/10 dark:via-slate-800/5 dark:to-slate-800 dark:to-90%"></div>
          <div className="absolute -left-1.5 bottom-0 h-full w-2 bg-gradient-to-t from-white/10 via-white/5 to-white dark:from-slate-800/10 dark:via-slate-800/5 dark:to-slate-800"></div>
          <h1 className="mx-auto text-left font-calsans text-3xl tracking-tight text-slate-900 dark:text-slate-100 md:text-center">
            <Balancer>{page.title}</Balancer>
          </h1>
        </div>
        <div className="relative mx-auto max-w-3xl border-l border-dashed border-slate-500/50 px-6 pt-4">
          <div className="absolute -left-1.5 bottom-0 h-full w-2 bg-gradient-to-b from-white/10 from-20% via-white/5 via-50% to-white to-80% dark:from-slate-800/10 dark:via-slate-800/5 dark:to-slate-800 dark:to-80%"></div>
          <span className="mb-4 block text-lg leading-8 text-slate-600 dark:text-slate-400">
            {page.description}
          </span>
          <div className="lg:aspect-square ring-photo shadow-photo relative mx-auto mt-4 flex aspect-[16/9] rounded-2xl text-center shadow-md ring-1 sm:aspect-[2/1] lg:max-w-3xl">
            <Image
              src={page.image ?? ""}
              alt={page.imageAlt ?? ""}
              fill={true}
              priority={true}
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
          </div>
          <figcaption className="pt-4 text-sm text-slate-500">
            {page.imageCaption}
          </figcaption>
        </div>
        <div className="relative mx-auto max-w-3xl px-6">
          <Mdx code={page.body.code} />
        </div>
      </div>
    </>
  )
}

export default AboutPage
