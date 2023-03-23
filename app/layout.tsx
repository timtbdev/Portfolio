import "@styles/tailwind.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { siteConfig } from "@/config/site"
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"

import { Header, TwIndicators } from "@components/index"
import { absoluteUrl, cn } from "@libs/utils"

interface RootLayoutProps {
  children: React.ReactNode
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: "Tim",
      url: "https://timtb.dev",
    },
  ],
  creator: "Tim",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [
      {
        url: absoluteUrl("/og.png"),
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
    creator: "@timtbdev",
  },
  icons: {
    icon: "/favicon-16x16.png",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={cn(
          "max-w-7x mx-auto bg-gray-50 font-sans text-gray-600 antialiased dark:bg-neutral-800 dark:text-white",
          inter.variable
        )}
      >
        <main
          className={cn(
            "mx-auto max-w-5xl border border-gray-50 bg-white shadow-sm shadow-gray-800/20 dark:border-neutral-700/40 dark:bg-neutral-900 dark:shadow-neutral-800/20"
          )}
        >
          <Header />
          {children}
        </main>

        <VercelAnalytics />
        <TwIndicators />
      </body>
    </html>
  )
}
