import "@styles/tailwind.css"
import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"
import { Footer, Grid, Header, ThemeProvider, TwIndicator } from "@/components"
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"

import { siteConfig } from "@config/site"
import { absoluteUrl, cn } from "@libs/utils"

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
    <html
      lang="en"
      className={cn(
        "fixed h-full scroll-smooth font-sans antialiased",
        fontSans.variable,
        calSans.variable
      )}
      suppressHydrationWarning
    >
      <body className={cn(" bg-white font-sans antialiased dark:bg-slate-900")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="selection:bg-orange-500/10 selection:text-orange-500 dark:selection:bg-sky-500/10 dark:selection:text-sky-500">
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
