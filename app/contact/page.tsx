import { Metadata } from "next"
import { metaData } from "@/config/meta"
import { absoluteUrl, constructOgImageUri } from "@/libs/utils"

import Address from "@components/contact/Address"
import { contact } from "@config/contact"

export const metadata: Metadata = {
  title: "Contact",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/contact"),
    title: metaData.title,
    description: metaData.description,
    siteName: metaData.title,
    images: [
      {
        url: constructOgImageUri(
          metaData.ogTitle,
          "Contact",
          metaData.tags,
          "/contact"
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
        "Contact",
        metaData.tags,
        "/contact"
      ),
    ],
    creator: metaData.author.twitterAddress,
  },
}

const ContactPage = () => {
  return (
    <>
      <div className="mx-auto max-w-5xl">
        <div className="relative mx-auto max-w-4xl border-b border-dashed border-slate-500/50 px-6 py-4 md:border-y">
          <div className="absolute -top-1.5 left-0 h-2 w-full bg-gradient-to-r from-white from-20% via-white/5 to-white to-80% dark:from-slate-800 dark:from-20% dark:via-slate-800/5 dark:to-slate-800 dark:to-80%"></div>
          <div className="absolute -bottom-1.5 left-0 h-2 w-full bg-gradient-to-r from-white from-10% via-white/5 to-white to-90% dark:from-slate-800 dark:from-10% dark:via-slate-800/5 dark:to-slate-800 dark:to-90%"></div>

          <h1 className="mx-auto text-center font-calsans text-3xl tracking-tight text-slate-900 dark:text-slate-100">
            Contact
          </h1>
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-4">
          <span className="mb-4 block text-center text-lg leading-8 text-slate-600 dark:text-slate-500">
            Get in touch with me anytime, through email or social media.
          </span>
        </div>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          <a
            className="block rounded-xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-md dark:bg-slate-700/50 dark:shadow-white/5 dark:ring-white/10"
            href="https://twitter.com/timtbdev"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
          >
            <svg
              className="h-6 w-6 text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
            </svg>
            <h3 className="mt-3 text-base font-semibold text-slate-700 dark:text-slate-300">
              Twitter
            </h3>
            <div className="mt-4 text-sm text-slate-500">
              Please follow me on twitter.
            </div>
            <div className="mt-4 text-sm text-slate-700 dark:text-slate-400">
              @timtbdev
            </div>
          </a>

          <a
            className="block rounded-xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-md dark:bg-slate-700/50 dark:shadow-white/5 dark:ring-white/10"
            href="mailto:timtb.dev@gmail.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Email"
          >
            <svg
              className="scale-85 h-6 w-6 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path
                  opacity=".3"
                  d="M20 6H4l8 4.99L20 6zM4 8v10h16V8l-8 5-8-5z"
                  fill="currentColor"
                ></path>
                <path
                  d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2l-8 4.99L4 6h16zm0 12H4V8l8 5 8-5v10z"
                  fill="CurrentColor"
                ></path>
              </g>
            </svg>
            <h3 className="mt-3 text-base font-semibold text-slate-700 dark:text-slate-300">
              Email
            </h3>
            <div className="mt-4 text-sm text-slate-500">
              Please drop me an email.
            </div>
            <div className="mt-4 text-sm text-slate-700 dark:text-slate-400">
              timtb.dev@gmail.com
            </div>
          </a>
          <a
            className="block rounded-xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-md dark:bg-slate-700/50 dark:shadow-white/5 dark:ring-white/10"
            href="https://github.com/timtbdev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"></path>
            </svg>
            <h3 className="mt-3 text-base font-semibold text-slate-700 dark:text-slate-300">
              Github
            </h3>
            <div className="mt-4 text-sm text-slate-500">
              Please visit my Github account.
            </div>
            <div className="mt-4 text-sm text-slate-700 dark:text-slate-400">
              github.com/timtbdev
            </div>
          </a>
        </div>
      </div>
    </>
  )
}

export default ContactPage
