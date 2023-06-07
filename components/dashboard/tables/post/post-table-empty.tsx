import { PostCreateButton } from "@/components/editor/post"
import TableEmpty from "@/components/ui/table-empty"
import { dbPosts } from "@/config"

const PostTableEmpty = () => {
  return (
    <>
      <TableEmpty
        title={dbPosts.title}
        description={dbPosts.description}
        emptyTitle={dbPosts.empty.title}
        emptyDescription={dbPosts.empty.descripton}
      >
        <PostCreateButton />
      </TableEmpty>
    </>
  )
}

export default PostTableEmpty
