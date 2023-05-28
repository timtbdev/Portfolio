"use client"

import { FC } from "react"
import Link from "next/link"
import {
  ProjectCreateButton,
  ProjectOperations,
} from "@/components/editor/project/"
import { db } from "@/libs/db"
import { getCurrentUser } from "@/libs/session"
import { formatYearMonth } from "@/libs/utils"

interface ProjectTableProps {
  projects: {
    id: string
    title: string
    publishedAt: Date
    category: string | undefined | null
  }[]
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
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Projects
            </h1>
            <p className="mt-2 text-sm text-gray-700">A list of all projects</p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <ProjectCreateButton />
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Published
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {projects.map((project) => (
                      <tr key={project.title}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {project.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {project.category}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {formatYearMonth(project.publishedAt)}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <ProjectOperations project={project} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{(page - 1) * perPage + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(page * perPage, totalProjects)}
            </span>{" "}
            of <span className="font-medium">{totalProjects}</span> projects
          </p>
          <div className="space-x-2">
            <Link
              href={page > 2 ? `/dashboard/?page=${page - 1}` : "/"}
              className={`${
                page === 1 ? "pointer-events-none opacity-50" : ""
              } inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50`}
            >
              Previous
            </Link>
            <Link
              href={
                page < totalPages
                  ? `/dashboard/?page=${page + 1}`
                  : `/dashboard/?page=${page}`
              }
              className={`${
                page >= totalPages ? "pointer-events-none opacity-50" : ""
              } inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50`}
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectTable
