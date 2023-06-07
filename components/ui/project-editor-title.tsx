import { FC } from "react"

import { Separator } from "./separator"

interface ProjectEditorTitleProps {
  title: string
  description: string
}

const ProjectEditorTitle: FC<ProjectEditorTitleProps> = ({
  title,
  description,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <p className="text-md font-semibold">{title}</p>
      <p className="text-md font-normal">{description}</p>
      <Separator />
    </div>
  )
}

export default ProjectEditorTitle
