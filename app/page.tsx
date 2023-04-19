import { Heading, Project } from "@/components"

import { projects } from "../config/projects"

const HomePage = () => {
  const length = projects.length
  return (
    <>
      <div className="relative isolate pb-10 sm:pb-14">
        <Heading />

        {projects.map((project, idx) => (
          <Project project={project} idx={idx} length={projects.length} />
        ))}
      </div>
    </>
  )
}

export default HomePage
