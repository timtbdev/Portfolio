import Link from "next/link"
import { Icons } from "@/components/ui/icons"

export default function Logo() {
  return (
    <>
      <div className="flex shrink-0 text-white">
        <Link href="/dashboard">
          <Icons.home strokeWidth={1.5} className="text-muted-foreground" />
        </Link>
      </div>
    </>
  )
}
