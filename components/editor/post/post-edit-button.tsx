import EditButton from "@/components/ui/edit-button"
import { dbPosts } from "@/config"
import { removeLastChar } from "@/libs/utils"
import { Post } from "@prisma/client"

interface PostEditButtonProps {
  post: Pick<Post, "id">
}

export default function PostEditButton({ post }: PostEditButtonProps) {
  return (
    <>
      <EditButton
        id={post.id}
        title={removeLastChar(dbPosts.title)}
        apiUrl={dbPosts.apiUrl}
        editUrl={dbPosts.editUrl}
      />
    </>
  )
}
