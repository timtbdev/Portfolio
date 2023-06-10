import { FC } from "react"
import { ButtonProps } from "@/components/ui/button"
import CreateButton from "@/components/ui/create-button"
import { dbContents } from "@/config"
import { removeLastChar } from "@/libs/utils"

interface ContentCreateButtonProps extends ButtonProps {}

const ContentCreateButton: FC<ContentCreateButtonProps> = ({
  className,
  variant,
  ...props
}) => {
  return (
    <>
      <CreateButton
        title={removeLastChar(dbContents.title)}
        apiUrl={dbContents.apiUrl}
        editUrl={dbContents.editUrl}
        className={className}
        variant={variant}
      />
    </>
  )
}

export default ContentCreateButton
