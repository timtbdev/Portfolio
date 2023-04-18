import { FC, ReactNode } from "react"
import Image from "next/image"

import { Blog } from "types"

/* eslint-disable @next/next/no-img-element */
type PostListProps = Blog

const PostList: FC<PostListProps> = ({
  id,
  title,
  href,
  description,
  imageUrl,
  date,
  dateTime,
  category,
  author,
}) => {
  return (
    <>
      <div className="ring-trisma dark:ring-dark-trisma mx-auto rounded-lg bg-gray-50 p-5 hover:bg-white dark:bg-slate-800/50 dark:hover:bg-slate-800">
        <article
          key={id}
          className="relative isolate flex flex-col gap-8 lg:flex-row"
        >
          <div className="lg:aspect-square relative aspect-[16/9] sm:aspect-[2/1] lg:w-64 lg:shrink-0">
            <Image
              src={imageUrl}
              alt=""
              fill={true}
              priority={true}
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div>
            <div className="flex items-center gap-x-4 text-xs">
              <time dateTime={dateTime} className="text-gray-500">
                {date}
              </time>
              <a
                href={category.href}
                className="bg-gray-10 relative z-10 whitespace-nowrap rounded-full px-4 py-1.5 font-medium text-slate-600 shadow-sm shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:ring-slate-600 dark:bg-slate-700/30 dark:text-slate-300 dark:ring-white/20 dark:hover:ring-slate-300"
              >
                {category.title}
              </a>
            </div>
            <div className="group relative max-w-xl">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-900 group-hover:text-gray-600 dark:text-slate-400">
                <a href={href}>
                  <span className="absolute inset-0" />
                  {title}
                </a>
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
        </article>
      </div>
    </>
  )
}

export default PostList
