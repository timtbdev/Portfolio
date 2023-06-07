import { ReactNode } from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { DashBoardNav } from "@/components/dashboard/"
import { Main, MainGrid } from "@/components/main"
import { metaData } from "@/config/meta"
import { getCurrentUser } from "@/libs/session"
import { absoluteUrl, constructOgImageUri } from "@/libs/utils"

export const metadata: Metadata = {
  title: "Dashboard",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/dashboard"),
    title: metaData.title,
    description: metaData.description,
    siteName: metaData.title,
    images: [
      {
        url: constructOgImageUri(
          metaData.ogTitle,
          "Dashboard",
          metaData.tags,
          "/dashboard"
        ),
        width: 1200,
        height: 630,
        alt: metaData.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: metaData.ogTitle,
    description: metaData.description,
    images: [
      constructOgImageUri(
        metaData.ogTitle,
        "Dashboard",
        metaData.tags,
        "/dashboard"
      ),
    ],
    creator: metaData.author.twitterAddress,
  },
}

interface DashBoardLayoutProps {
  children: ReactNode
}

export default async function DashBoardLayout({
  children,
}: DashBoardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound
  }
  return (
    <>
      <DashBoardNav
        id={user.id}
        name={user.name || ""}
        email={user.email || ""}
        image={user.image || ""}
      />
      <MainGrid>
        <Main>{children}</Main>
      </MainGrid>
    </>
  )
}
