import { FC } from "react"
import { formatYearMonth } from "@/libs/utils"

import { ProjectAttributes } from "types"
import Browser from "./Browser"
import Container from "./Container"
import Features from "./Features"
import Header from "./Header"
import Line from "./Line"
import ScreenShot from "./ScreenShot"
import Year from "./Year"

interface ProjectProps {
  idx: number
  project: ProjectAttributes
  length: number
}

const Project: FC<ProjectProps> = ({ idx, project, length }) => {
  return (
    <>
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        {/* Body */}
        <Year year={formatYearMonth(project.releaseDate)} />
        <Line />
        <Browser key={project.url + idx} url={project.url}>
          <Container>
            <div className="overflow-hidden">
              <Header
                title={project.title}
                tags={project.tags}
                icon={project.icon}
                iconDescription={project.iconDescription}
                type={project.type}
              />
              <Features features={project.features} />
            </div>
            <ScreenShot screenshot={project.screenshot} />
          </Container>
        </Browser>
      </div>
      {idx != length - 1 && <Line />}
    </>
  )
}

export default Project
