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

import {Project} from "@prisma/client"

interface ProjectProps {
  project: Project
  line: boolean
}

const Project: FC<ProjectProps> = ({
  project,
  line,
}) => {

  const features: {title: string, description: string} [] = [
    {
      title: "Components",
      description: project.components
    },
    {
      title: "Libraries",
      description: project.libraries,
    },
    {
      title: "Backend",
      description: project.backend
    }
  ]

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        {/* Body */}
        <ProjectDate year={formatYearMonth(project.publishedAt)} />
        <ProjectLine />
        <ProjectBrowser key={project.id} url={project.url}>
          <ProjectContainer>
            <div className="overflow-hidden">
              <ProjectHeader title={project.title} tags={project.tags.split(",")} icon={project.icon} />
              <ProjectFeatures features={features} />
            </div>
            <ProjectScreenShot screenshot={project.screenshot} />
          </ProjectContainer>
        </ProjectBrowser>
      </div>
      {!line && <ProjectLine />}
    </>
  )
}

export default Project
