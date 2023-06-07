import { FC } from "react"
import Link from "next/link"

import { buttonVariants } from "./button"
import { EmptyPlaceholder } from "./empty-placeholder"

interface NotFoundPlaceHolderProps {
  title: string
  notFound: string
  backUrl: string
}

const NotFoundPlaceHolder: FC<NotFoundPlaceHolderProps> = ({
  title,
  notFound,
  backUrl,
}) => {
  return (
    <EmptyPlaceholder className="mx-auto max-w-[800px]">
      <EmptyPlaceholder.Icon name="warning" />
      <EmptyPlaceholder.Title>Uh oh! Not Found</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>{notFound}</EmptyPlaceholder.Description>
      <Link href={backUrl} className={buttonVariants({ variant: "ghost" })}>
        Go back to {title}
      </Link>
    </EmptyPlaceholder>
  )
}

export default NotFoundPlaceHolder
