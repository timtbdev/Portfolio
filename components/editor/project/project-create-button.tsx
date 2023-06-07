import { FC } from "react"
import { ButtonProps } from "@/components/ui/button"
import CreateButton from "@/components/ui/create-button"
import { dbProjects } from "@/config"
import { removeLastChar } from "@/libs/utils"

interface ProjectCreateButtonProps extends ButtonProps {}

const ProjectCreateButton: FC<ProjectCreateButtonProps> = ({
  className,
  variant,
  ...props
}) => {
  return (
    <>
      <CreateButton
        title={removeLastChar(dbProjects.title)}
        apiUrl={dbProjects.apiUrl}
        editUrl={dbProjects.editUrl}
        className={className}
        variant={variant}
      />
    </>
  )
}

export default ProjectCreateButton
