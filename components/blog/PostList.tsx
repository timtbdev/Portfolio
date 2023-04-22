import { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { shimmer, toBase64 } from "@/libs/utils"

import { BlogAttributes } from "types"

type PostListProps = BlogAttributes

const PostList: FC<PostListProps> = ({
  id,
  title,
  slug,
  description,
  imageUrl,
  date,
  dateTime,
  category,
  author,
}) => {
  return (
    <>
      <div
        key={id + slug}
        className="ring-trisma dark:ring-dark-trisma group mx-auto rounded-lg bg-gray-50 p-5 hover:bg-white dark:bg-slate-800/50 dark:hover:bg-slate-800"
      >
        <Link
          href={`/blog/${slug}`}
          className="relative isolate flex flex-col gap-8 lg:flex-row"
        >
          <div className="lg:aspect-square relative aspect-[16/9] sm:aspect-[2/1] lg:w-64 lg:shrink-0">
            <Image
              src={imageUrl}
              alt=""
              fill={true}
              priority={true}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(256, 256)
              )}`}
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div>
            <div className="flex items-center gap-x-4 text-xs">
              <time dateTime={dateTime} className="text-gray-500">
                {date}
              </time>
              <div className="bg-gray-10 relative whitespace-nowrap rounded-full px-4 py-1.5 font-medium text-slate-500 shadow-sm shadow-black/5 ring-1 ring-black/10 dark:bg-slate-700/30 dark:ring-white/10">
                {category.title}
              </div>
            </div>
            <div className="group relative max-w-xl">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-900 dark:text-slate-400">
                {title}
              </h3>
              <p className="mt-5 text-sm leading-6 text-slate-600">
                {description}
              </p>
            </div>
            <div className="mt-6 flex border-t border-black/5 pt-6 dark:border-white/10">
              <div className="relative flex items-center gap-x-4">
                <Image
                  src={author.imageUrl}
                  alt=""
                  width={40}
                  height={40}
                  priority={true}
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(40, 40)
                  )}`}
                  className="rounded-full bg-slate-500 dark:bg-slate-600"
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-slate-900 dark:text-slate-500">
                    <span className="absolute inset-0" />
                    {author.name}
                  </p>
                  <p className="text-slate-600">{author.role}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default PostList
