import { FC } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/libs/utils"

interface DashBoardProps {
  url: string
  title: string
  count: number
  empty: string
  description: string
}

const getIcon = (title: string) => {
  const style = "h-6 w-6 text-muted-foreground"
  switch (title) {
    case "Projects":
      return <Icons.project className={cn(style)} />
      break
    case "Posts":
      return <Icons.post className={cn(style)} />
      break
    case "Pages":
      return <Icons.page className={cn(style)} />
      break
    default:
      return <Icons.social className={cn(style)} />
      break
  }
}

const DashBoard: FC<DashBoardProps> = ({
  url,
  title,
  count,
  empty,
  description,
}) => {
  return (
    <Link href={url}>
      <Card className="hover:bg-gray-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {getIcon(title)}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{count}</div>
          <p className="text-xs text-muted-foreground">
            {count > 0 ? description : empty}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

export default DashBoard
