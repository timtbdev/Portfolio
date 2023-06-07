"use client"

import { FC } from "react"
import {
  ProjectCreateButton,
  ProjectEditButton,
} from "@/components/editor/project/"
import Paging from "@/components/ui/paging"
import TableBody from "@/components/ui/table-body"
import TableBodyHead from "@/components/ui/table-body-head"
import TableHeader from "@/components/ui/table-header"
import { dbProjects } from "@/config"
import { formatYearMonth } from "@/libs/utils"
import { CategoryOnProject as Category, Project } from "@prisma/client"

interface ProjectTableProps {
  projects: (Pick<Project, "id" | "title" | "publishedAt"> & {
    categories: Category[]
  })[]
  page: number
  perPage: number
  totalProjects: number
  totalPages: number
}

const ProjectTable: FC<ProjectTableProps> = ({
  projects,
  page,
  perPage,
  totalPages,
  totalProjects,
}) => {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <TableHeader
          title={dbProjects.title}
          description={dbProjects.description}
        >
          <ProjectCreateButton />
        </TableHeader>
        <TableBody>
          <TableBodyHead headers={dbProjects.tableHeaders} />
          <tbody className="divide-y divide-gray-200 bg-white">
            {projects.map((project, idx) => (
              <tr key={project.title + idx}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {project.title}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {project.categories?.map((category) => category.title)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {formatYearMonth(project.publishedAt)}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <ProjectEditButton project={project} />
                </td>
              </tr>
            ))}
          </tbody>
        </TableBody>
        <Paging
          page={page}
          perPage={perPage}
          totalItems={totalProjects}
          totalPages={totalPages}
          baseUrl={dbProjects.baseUrl}
          pageUrl={dbProjects.pageUrl}
        />
      </div>
    </>
  )
}

export default ProjectTable
