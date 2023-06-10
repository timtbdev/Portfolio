"use client"

import { FC } from "react"
import {
  ContentCreateButton,
  ContentEditButton,
} from "@/components/editor/content"
import Paging from "@/components/ui/paging"
import TableBody from "@/components/ui/table-body"
import TableBodyHead from "@/components/ui/table-body-head"
import TableHeader from "@/components/ui/table-header"
import { dbContents } from "@/config"
import { formatYearMonth } from "@/libs/utils"
import { Content } from "@prisma/client"
import { v4 } from "uuid"

interface ContentTableProps {
  contents: Pick<Content, "id" | "title" | "type" | "updatedAt">[]
  page: number
  perPage: number
  totalContents: number
  totalPages: number
}

const ContentTable: FC<ContentTableProps> = ({
  contents,
  page,
  perPage,
  totalPages,
  totalContents,
}) => {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <TableHeader
          title={dbContents.title}
          description={dbContents.description}
        >
          <ContentCreateButton />
        </TableHeader>
        <TableBody>
          <TableBodyHead headers={dbContents.tableHeaders} />
          <tbody className="divide-y divide-gray-200 bg-white">
            {contents.map((content, idx) => (
              <tr key={v4()}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {content.title}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {content.type}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {formatYearMonth(content.updatedAt)}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <ContentEditButton content={content} />
                </td>
              </tr>
            ))}
          </tbody>
        </TableBody>
        <Paging
          page={page}
          perPage={perPage}
          totalItems={totalContents}
          totalPages={totalPages}
          baseUrl={dbContents.baseUrl}
          pageUrl={dbContents.pageUrl}
        />
      </div>
    </>
  )
}

export default ContentTable
