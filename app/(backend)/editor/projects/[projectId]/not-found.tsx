import NotFoundPlaceHolder from "@/components/ui/not-found-placeholder"
import { dbProjects } from "@/config"

export default function NotFound() {
  return (
    <NotFoundPlaceHolder
      title={dbProjects.title}
      backUrl={dbProjects.baseUrl}
      notFound={dbProjects.notFound}
    />
  )
}
