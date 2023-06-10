import EditButton from "@/components/ui/edit-button"
import { dbContents } from "@/config"
import { removeLastChar } from "@/libs/utils"
import { Content } from "@prisma/client"

interface ContentEditButtonProps {
  content: Pick<Content, "id">
}

export default function ContentEditButton({ content }: ContentEditButtonProps) {
  return (
    <>
      <EditButton
        id={content.id}
        title={removeLastChar(dbContents.title)}
        apiUrl={dbContents.apiUrl}
        editUrl={dbContents.editUrl}
      />
    </>
  )
}
