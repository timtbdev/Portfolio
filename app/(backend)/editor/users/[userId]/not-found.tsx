import NotFoundPlaceHolder from "@/components/ui/not-found-placeholder"
import { dbUser } from "@/config"

export default function NotFound() {
  return (
    <NotFoundPlaceHolder
      title={dbUser.title}
      backUrl={dbUser.baseUrl}
      notFound={dbUser.notFound}
    />
  )
}
