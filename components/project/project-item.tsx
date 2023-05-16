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

interface ProjectProps {
  id: string
  title: string
  icon: string
  screenshot: string
  url: string
  date: Date
  tags: { title: string }[]
  features: {
    title: string
    description: string
  }[]
  line: boolean
}

const Project: FC<ProjectProps> = ({
  id,
  title,
  icon,
  screenshot,
  url,
  date,
  tags,
  features,
  line,
}) => {
  return (
    <>
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        {/* Body */}
        <ProjectDate year={formatYearMonth(date)} />
        <ProjectLine />
        <ProjectBrowser key={id} url={url}>
          <ProjectContainer>
            <div className="overflow-hidden">
              <ProjectHeader title={title} tags={tags} icon={icon} />
              <ProjectFeatures features={features} />
            </div>
            <ProjectScreenShot screenshot={screenshot} />
          </ProjectContainer>
        </ProjectBrowser>
      </div>
      {!line && <ProjectLine />}
    </>
  )
}

export default Project
