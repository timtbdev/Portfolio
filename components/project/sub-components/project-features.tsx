import { FC } from "react"
import { Project } from "@prisma/client"
import { v4 } from "uuid"

import { Feature } from "types"

interface ProjectFeaturesProps {
  project: Pick<Project, "components" | "libraries" | "backend">
}

const ProjectFeatures: FC<ProjectFeaturesProps> = ({ project }) => {
  const features: Feature[] = [
    {
      title: "Components",
      description: project.components ? project.components : "",
    },
    {
      title: "Libraries",
      description: project.libraries ? project.libraries : "",
    },
    { title: "Backend", description: project.backend ? project.backend : "" },
  ]

  return (
    <>
      <div className="relative p-3">
        <div className="relative mt-6 flex flex-col gap-4 rounded-xl border border-dashed border-slate-500/50 p-4 sm:mx-0 ">
          <div className="text-normal absolute left-2.5 top-0 -translate-y-1/2 bg-white px-2 font-normal text-slate-500 dark:bg-slate-800">
            Features
          </div>

          {features.map((feature) => (
            <div key={v4()} className="flex flex-col gap-1.5">
              <p className="text-lg font-semibold leading-6 text-slate-800 dark:text-slate-200">
                {feature.title}
              </p>
              <dd className="text-medium text-slate-600 dark:text-slate-400">
                {feature.description}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProjectFeatures
