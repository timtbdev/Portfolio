import { FC } from "react"
import { formatYearMonth } from "@/libs/utils"

import {
  ProjectBrowser,
  ProjectContainer,
  ProjectDate,
  ProjectFeatures,
  ProjectHeader,
  ProjectLine,
  ProjectScreenShot,
} from "./sub-components"

import {Project, Feature, CategoryOnProject as Category, TagOnProject as Tag} from "@prisma/client"
import { empty } from "@prisma/client/runtime"

interface ProjectProps {
  project: (Project & {
    tags: Tag[],
    categories: Category[],
    features: Feature[]
}),
  line: boolean
}

const Project: FC<ProjectProps> = ({
  project,
  line,
}) => {



  return (
    <>
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        {/* Body */}
        <ProjectDate year={formatYearMonth(project.publishedAt)} />
        <ProjectLine />
        <ProjectBrowser key={project.id} url={project.url ? project.url : ""}>
          <ProjectContainer>
            <div className="overflow-hidden">
              <ProjectHeader title={project.title} tags={project?.tags ? project?.tags : []} icon={project.icon ? project.icon : ""} />
              <ProjectFeatures features={project.features} />
            </div>
            <ProjectScreenShot screenshot={project.screenshot ? project.screenshot : ""} />
          </ProjectContainer>
        </ProjectBrowser>
      </div>
      {!line && <ProjectLine />}
    </>
  )
}

export default Project
