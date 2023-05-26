import { FC, ReactNode } from "react"
import { cn } from "@/libs/utils"

interface UserProps {
  children: ReactNode
}

export default function UserLayout({ children }: UserProps) {
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
