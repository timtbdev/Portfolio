import { Heading, Project } from "@/components"

import { projects } from "../config/projects"

const HomePage = () => {
  return (
    <>
      <div className="relative isolate">
        <Heading />

        {projects.map((project, idx) => (
          <Project project={project} idx={idx} />
        ))}
      </div>
    </>
  )
}

export default HomePage
