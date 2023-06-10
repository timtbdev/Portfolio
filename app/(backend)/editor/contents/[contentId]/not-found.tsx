import NotFoundPlaceHolder from "@/components/ui/not-found-placeholder"
import { dbContents } from "@/config"

export default function NotFound() {
  return (
    <NotFoundPlaceHolder
      title={dbContents.title}
      backUrl={dbContents.baseUrl}
      notFound={dbContents.notFound}
    />
  )
}
