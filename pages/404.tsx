import "@styles/tailwind.css"
import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"
import Head from "next/head"
import { Footer, Grid, Header, ThemeProvider, TwIndicator } from "@/components"
import { absoluteUrl, cn } from "@/libs/utils"

import { Site, SiteAuthor, SiteKeywords } from "../config/meta"

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

export default function Custom404() {
  const url = new URL(absoluteUrl("/favicons"))
  const pageTitle = "Error 404"
  return (
    <>
      <Head>
        <title>{`${pageTitle} | ${Site.title}`}</title>
        <meta charSet="utf-8" />
        <meta name="keywords" content={SiteKeywords.join(",")}></meta>
        <meta name="description" content={Site.description} />
        <meta name="author" content={SiteAuthor.name} />
        <meta name="viewport" content={Site.viewport} />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href={`${url}/apple-icon-57x57.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href={`${url}/apple-icon-60x60.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href={`${url}/apple-icon-72x72.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href={`${url}/apple-icon-76x76.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href={`${url}/apple-icon-114x114.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href={`${url}/apple-icon-120x120.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href={`${url}/apple-icon-144x144.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href={`${url}/apple-icon-152x152.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${url}/apple-icon-180x180.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={`${url}/android-icon-192x192.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${url}/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href={`${url}/favicon-96x96.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${url}/favicon-16x16.png`}
        />
        <link rel="manifest" href={`${url}/manifest.json`} />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content={`${url}/ms-icon-144x144.png`}
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <main
          className={cn(
            "grid min-h-full place-items-center bg-white px-6 py-24 font-sans  antialiased dark:bg-slate-800/90 sm:py-32 lg:px-8",
            fontSans.variable,
            calSans.variable
          )}
        >
          <div className="text-center font-sans">
            <p className="font-calsans text-5xl text-slate-600 dark:text-slate-300">
              404
            </p>
            <h1 className="mt-4 font-calsans text-3xl tracking-tight text-slate-900 dark:text-slate-200 sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-6 text-lg font-medium leading-7 text-gray-600">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/"
                className="rounded-md bg-blue-500 px-3.5 py-2.5 font-sans text-sm text-white shadow-sm hover:bg-blue-600 dark:bg-sky-500 dark:hover:bg-sky-600"
              >
                Go back home
              </a>
            </div>
          </div>
        </main>
      </ThemeProvider>
    </>
  )
}
