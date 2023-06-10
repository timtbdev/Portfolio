import { ContentCreateButton } from "@/components/editor/content"
import TableEmpty from "@/components/ui/table-empty"
import { dbContents } from "@/config"

const ContentTableEmpty = () => {
  return (
    <>
      <TableEmpty
        title={dbContents.title}
        description={dbContents.description}
        emptyTitle={dbContents.empty.title}
        emptyDescription={dbContents.empty.descripton}
      >
        <ContentCreateButton />
      </TableEmpty>
    </>
  )
}

export default ContentTableEmpty
