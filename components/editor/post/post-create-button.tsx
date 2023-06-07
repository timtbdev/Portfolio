import { FC } from "react"
import { ButtonProps } from "@/components/ui/button"
import CreateButton from "@/components/ui/create-button"
import { dbPosts } from "@/config"
import { removeLastChar } from "@/libs/utils"

interface PostCreateButtonProps extends ButtonProps {}

const PostCreateButton: FC<PostCreateButtonProps> = ({
  className,
  variant,
  ...props
}) => {
  return (
    <>
      <CreateButton
        title={removeLastChar(dbPosts.title)}
        apiUrl={dbPosts.apiUrl}
        editUrl={dbPosts.editUrl}
        className={className}
        variant={variant}
      />
    </>
  )
}

export default PostCreateButton
