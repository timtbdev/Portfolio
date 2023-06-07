import EditButton from "@/components/ui/edit-button"
import { dbProjects } from "@/config"
import { removeLastChar } from "@/libs/utils"
import { Project } from "@prisma/client"

interface ProjectEditButtonProps {
  project: Pick<Project, "id">
}

export default function ProjectEditButton({ project }: ProjectEditButtonProps) {
  return (
    <>
      <EditButton
        id={project.id}
        title={removeLastChar(dbProjects.title)}
        apiUrl={dbProjects.apiUrl}
        editUrl={dbProjects.editUrl}
      />
    </>
  )
}
