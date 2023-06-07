"use client"

import { FC } from "react"
import { PostCreateButton, PostEditButton } from "@/components/editor/post/"
import Paging from "@/components/ui/paging"
import TableBody from "@/components/ui/table-body"
import TableBodyHead from "@/components/ui/table-body-head"
import TableHeader from "@/components/ui/table-header"
import { dbPosts } from "@/config"
import { formatDate } from "@/libs/utils"
import { Post } from "@prisma/client"

interface PostTableProps {
  posts: Pick<Post, "id" | "title" | "image" | "published" | "updatedAt">[]
  page: number
  perPage: number
  totalPosts: number
  totalPages: number
}

const PostTable: FC<PostTableProps> = ({
  posts,
  page,
  perPage,
  totalPages,
  totalPosts,
}) => {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <TableHeader title={dbPosts.title} description={dbPosts.description}>
          <PostCreateButton />
        </TableHeader>
        <TableBody>
          <TableBodyHead headers={dbPosts.tableHeaders} />
          <tbody className="divide-y divide-gray-200 bg-white">
            {posts.map((post) => (
              <tr key={post.title}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {post.title}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {formatDate(post.updatedAt.toDateString())}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {post.published}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <PostEditButton post={post} />
                </td>
              </tr>
            ))}
          </tbody>
        </TableBody>
        <Paging
          page={page}
          perPage={perPage}
          totalItems={totalPosts}
          totalPages={totalPages}
          baseUrl={dbPosts.baseUrl}
          pageUrl={dbPosts.pageUrl}
        />
      </div>
    </>
  )
}

export default PostTable
