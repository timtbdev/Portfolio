import { FC, ReactNode } from "react"
import { Metadata } from "next"
import { Grid } from "@/components/core"
import { metaData } from "@/config/meta"
import { absoluteUrl, cn, constructOgImageUri } from "@/libs/utils"

export const metadata: Metadata = {
  title: "Login",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/login"),
    title: metaData.title,
    description: metaData.description,
    siteName: metaData.title,
    images: [
      {
        url: constructOgImageUri(
          metaData.ogTitle,
          "Login",
          metaData.tags,
          "/login"
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
      constructOgImageUri(metaData.ogTitle, "Login", metaData.tags, "/login"),
    ],
    creator: metaData.author.twitterAddress,
  },
}

interface LoginLayoutProps {
  children: ReactNode
}

const LoginLayout: FC<LoginLayoutProps> = ({ children }) => {
  return <Grid>{children}</Grid>
}

export default LoginLayout
