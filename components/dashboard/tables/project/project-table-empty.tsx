import { ProjectCreateButton } from "@/components/editor/project"
import TableEmpty from "@/components/ui/table-empty"
import { dbProjects } from "@/config"

const ProjectTableEmpty = () => {
  return (
    <>
      <TableEmpty
        title={dbProjects.title}
        description={dbProjects.description}
        emptyTitle={dbProjects.empty.title}
        emptyDescription={dbProjects.empty.descripton}
      >
        <ProjectCreateButton />
      </TableEmpty>
    </>
  )
}

export default ProjectTableEmpty
