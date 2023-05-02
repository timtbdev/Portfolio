import { FC } from "react"
import { formatYearMonth } from "@/libs/utils"

import Browser from "./Browser"
import Container from "./Container"
import Date from "./Date"
import Features from "./Features"
import Header from "./Header"
import Line from "./Line"
import ScreenShot from "./ScreenShot"

interface ProjectProps {
  id: string
  title: string
  icon: string
  screenshot: string
  url: string
  date: string
  tags: Array<string>
  features: Array<string>
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
        <Date year={formatYearMonth(date)} />
        <Line />
        <Browser key={id} url={url}>
          <Container>
            <div className="overflow-hidden">
              <Header title={title} tags={tags} icon={icon} />
              <Features features={features} />
            </div>
            <ScreenShot screenshot={screenshot} />
          </Container>
        </Browser>
      </div>
      {!line && <Line />}
    </>
  )
}

export default Project
