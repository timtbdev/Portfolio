import "@styles/tailwind.css"
import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"
import { Footer, Grid, Header, ThemeProvider, TwIndicator } from "@/components"
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"

import { absoluteUrl, cn } from "@libs/utils"
import {
  Site,
  SiteAppleIcons,
  SiteAuthor,
  SiteIcons,
  SiteKeywords,
  SiteScreenShots,
} from "../config/meta/"

interface RootLayoutProps {
  children: React.ReactNode
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const calSans = localFont({
  src: "../public/fonts/CalSans-SemiBold.woff2",
  variable: "--font-calsans",
  display: "swap",
})

export const metadata: Metadata = {
  title: Site.title,
  applicationName: Site.title,
  description: Site.description,
  keywords: SiteKeywords,
  authors: [
    {
      name: SiteAuthor.name,
      url: SiteAuthor.url,
    },
  ],
  creator: SiteAuthor.name,
  publisher: SiteAuthor.name,
  viewport: Site.viewport,
  robots: "index, follow",

  manifest: Site.manifest,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: Site.url,
    title: Site.title,
    description: Site.description,
    siteName: Site.title,
    images: [
      {
        url: absoluteUrl("/og.png"),
        width: 1200,
        height: 630,
        alt: Site.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: Site.title,
    description: Site.description,
    images: [`${Site.url}/og.png`],
    creator: SiteAuthor.twitter,
  },
  appleWebApp: {
    capable: true,
    title: Site.title,
    statusBarStyle: "black-translucent",
  },
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn(
        "layout h-full scroll-smooth font-sans antialiased",
        fontSans.variable,
        calSans.variable
      )}
      suppressHydrationWarning
    >
      <body
        className="layout h-full bg-white font-sans antialiased dark:bg-slate-800/90"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-full selection:bg-blue-500/10 selection:text-blue-500 dark:selection:bg-sky-500/10 dark:selection:text-sky-500">
            <Header />
            <main className="mx-auto max-w-5xl">
              <Grid>{children}</Grid>
            </main>
            <Footer />
            <VercelAnalytics />
            <TwIndicator />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
