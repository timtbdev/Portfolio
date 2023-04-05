import { Project } from "@/components"
import { projects } from "@/config/projects"

const ProjectPage = () => {
  return (
    <>
      <div className="relative isolate pt-10">
        {projects.map((project, idx) => (
          <Project idx={idx} project={project} />
        ))}
      </div>
    </>
  )
}

export default ProjectPage
