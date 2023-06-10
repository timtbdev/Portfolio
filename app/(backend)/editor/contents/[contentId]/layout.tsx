import { ReactNode } from "react"
import { cn } from "@/libs/utils"

interface ContentLayoutProps {
  children: ReactNode
}

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <>
      <div
        className={cn("mx-auto max-w-5xl px-2 py-5 text-left sm:px-4 lg:px-8")}
      >
        {children}
      </div>
    </>
  )
}
