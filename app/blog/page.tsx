import { Metadata } from "next"
import { PostList, Text, Title } from "@/components/blog"
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
      <div className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <Title className="mb-8 text-center md:mb-6">Blog</Title>
            <Text className="mb-8 text-center md:mb-6">
              Thoughts and stories about making great mobile and web apps.
            </Text>
            <div className="lg:mt-15 mt-10 space-y-10 lg:space-y-10">
              {blog.map((post) => (
                <PostList
                  id={post.id}
                  title={post.title}
                  href={post.href}
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
      </div>
    </>
  )
}

export default BlogPage
