import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  absoluteUrl,
  constructOgImageUri,
  formatDate,
  shimmer,
  toBase64,
} from "@/libs/utils"
import {
  CalendarDaysIcon as DateIcon,
  ClockIcon as TimeIcon,
} from "@heroicons/react/24/outline"
import { allPages, allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { metaData } from "@config/meta"

export const metadata: Metadata = {
  title: "Blog",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/blog"),
    title: metaData.title,
    description: metaData.description,
    siteName: metaData.title,
    images: [
      {
        url: constructOgImageUri(
          metaData.ogTitle,
          "Blog",
          metaData.tags,
          "/blog"
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
      constructOgImageUri(metaData.ogTitle, "Blog", metaData.tags, "/blog"),
    ],
    creator: metaData.author.twitterAddress,
  },
}

const BlogPage = async () => {
  const page = allPages.find((page) => page.slugAsParams === "blog")

  if (!page) {
    return null
  }
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })
  return (
    <>
      <div className="mx-auto max-w-5xl">
        <div className="relative mx-auto max-w-4xl border-b border-dashed border-slate-500/50 px-6 py-4 md:border-y">
          <div className="absolute -top-1.5 left-0 h-2 w-full bg-gradient-to-r from-white from-20% via-white/5 to-white to-80% dark:from-slate-800 dark:from-20% dark:via-slate-800/5 dark:to-slate-800 dark:to-80%"></div>
          <div className="absolute -bottom-1.5 left-0 h-2 w-full bg-gradient-to-r from-white from-10% via-white/5 to-white to-90% dark:from-slate-800 dark:from-10% dark:via-slate-800/5 dark:to-slate-800 dark:to-90%"></div>

          <h1 className="mx-auto text-center font-calsans text-3xl tracking-tight text-slate-900 dark:text-slate-100">
            {page.title}
          </h1>
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-4">
          <span className="mb-4 block text-center text-lg leading-8 text-slate-600 dark:text-slate-500">
            {page.description}
          </span>

          <div className="lg:mt-15 mt-10 space-y-5 lg:space-y-5">
            {posts.map((post) => (
              <div
                key={post._id}
                className="relative w-full rounded-2xl bg-white/20 p-2.5 shadow-sm shadow-black/5 ring-[0.8px] ring-black/5 dark:bg-white/5 dark:shadow-white/5 dark:ring-white/10"
              >
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 opacity-[0.15] blur-lg dark:from-sky-500 dark:to-sky-600"></div>
                <div className="relative max-w-full rounded-[0.62rem] bg-white shadow-sm  shadow-black/5 ring-[0.8px] ring-black/5 hover:bg-gray-50 dark:bg-slate-800 dark:shadow-white/5 dark:ring-white/10 dark:hover:bg-slate-900/50">
                  <div className="group mx-auto p-5">
                    <Link
                      href={`blog/${post.slugAsParams}`}
                      className="relative isolate flex flex-col gap-8 lg:flex-row"
                    >
                      <div className="lg:aspect-square relative aspect-[16/9] sm:aspect-[2/1] lg:w-64 lg:shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill={true}
                          priority={true}
                          placeholder="blur"
                          className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                          blurDataURL={`data:image/svg+xml;base64,${toBase64(
                            shimmer(256, 256)
                          )}`}
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                      <div>
                        <div className="group relative max-w-xl">
                          <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-900 dark:text-slate-400">
                            {post.title}
                          </h3>
                          <p className="mt-5 text-sm leading-6 text-slate-600">
                            {post.description}
                          </p>
                        </div>
                        <div className="mt-6 flex border-t border-black/5 pt-6 dark:border-white/10">
                          <div className="flex items-center text-sm leading-6 text-slate-500">
                            <DateIcon className="h-5 w-5 text-slate-500" />
                            <span className="ml-1.5">
                              {formatDate(post.date)}
                            </span>
                          </div>
                          <div className="ml-1.5 flex items-center text-sm leading-6 text-slate-500">
                            <TimeIcon className="h-5 w-5 text-slate-500" />
                            <span className="ml-1.5">
                              {post.readingTime.text}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogPage
