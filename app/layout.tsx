import "@styles/tailwind.css"
import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"
import { Footer, Grid, Header, ThemeProvider, TwIndicator } from "@/components"
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"

import { absoluteUrl, cn, getPageOgImageUrl, getUrl } from "@libs/utils"

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
    default: "Tim | Portfolio",
    template: "%s | Portfolio",
  },
  generator: "Tim",
  applicationName: "Tim | Portfolio",
  description:
    "Tim is an web and mobile developer based in Hayward, California.",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Tim",
    "Tumur",
    "Bazarragchaa",
    "Hayward",
    "San Francisco",
    "Bay Area",
    "California",
    "Android Developer",
    "Web Developer",
    "Kotlin",
    "Typescript",
    "Android Jetpack",
    "Jetpack Compose",
    "NextJs",
    "TailwindCss",
    "React",
  ],
  authors: [
    {
      name: "Tim",
      url: "https://twitter.com/timtbdev",
    },
  ],
  creator: "Tim",
  publisher: "Tim",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://timtb.dev"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/favicons/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut: ["/favicons/favicon-32x32.png"],
    apple: [
      { url: "/favicons/apple-icon.png" },
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/favicons/apple-icon-precomposed.png",
      },
    ],
  },

  manifest: absoluteUrl("/favicons/manifest.json"),

  openGraph: {
    type: "website",
    locale: "en_US",
    url: getUrl(),
    title: "Tim | Portfolio",
    description:
      "Tim is an web and mobile developer based in Hayward, California.",
    siteName: "Tim's Portfolio",
    images: [
      {
        url: getPageOgImageUrl("Tim", "Portfolio"),
        width: 1200,
        height: 630,
        alt: "Tim's Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tim | Portfolio",
    description:
      "Tim is an web and mobile developer based in Hayward, California.",
    images: [getPageOgImageUrl("Tim", "Portfolio")],
    creator: "@timtbdev",
  },
  appleWebApp: {
    capable: true,
    title: "Tim | Portfolio",
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
