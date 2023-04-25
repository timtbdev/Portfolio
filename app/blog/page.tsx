import { Metadata } from "next"
import { PostList } from "@/components/blog"
import { absoluteUrl, constructOgImageUri } from "@/libs/utils"

import { blog } from "@config/blog"
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

const BlogPage = () => {
  return (
    <>
      <div className="mx-auto max-w-5xl">
        <div className="relative mx-auto max-w-4xl border-b border-dashed border-slate-500/50 px-6 py-4 md:border-y">
          <div className="absolute -top-1.5 left-0 h-2 w-full bg-gradient-to-r from-white from-20% via-white/5 to-white to-80% dark:from-slate-800 dark:from-20% dark:via-slate-800/5 dark:to-slate-800 dark:to-80%"></div>
          <div className="absolute -bottom-1.5 left-0 h-2 w-full bg-gradient-to-r from-white from-10% via-white/5 to-white to-90% dark:from-slate-800 dark:from-10% dark:via-slate-800/5 dark:to-slate-800 dark:to-90%"></div>

          <h1 className="mx-auto text-center font-calsans text-3xl tracking-tight text-slate-900 dark:text-slate-100">
            Blog
          </h1>
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-4">
          <span className="mb-4 block text-center text-lg leading-8 text-slate-600 dark:text-slate-500">
            Thoughts and stories about making great mobile and web apps.
          </span>

          <div className="lg:mt-15 mt-10 space-y-10 lg:space-y-10">
            {blog.map((post) => (
              <PostList
                id={post.id}
                title={post.title}
                slug={post.slug}
                description={post.description}
                imageUrl={post.imageUrl}
                date={post.date}
                dateTime={post.dateTime}
                category={post.category}
                author={post.author}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogPage
