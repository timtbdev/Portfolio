import { Metadata } from "next"
import { metaData } from "@/config/meta"
import { EmailIcon, GithubIcon, TwitterIcon } from "@/icons"
import { absoluteUrl, cn, constructOgImageUri } from "@/libs/utils"
import { allPages, allSocials } from "contentlayer/generated"
import Balancer from "react-wrap-balancer"

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
  const page = allPages.find((page) => page.slugAsParams === "contact")

  if (!page) return null

  const socials = page.socials?.map((social) =>
    allSocials.find(({ slug }) => slug === `/socials/${social}`)
  )

  return (
    <>
      <div className="mx-auto max-w-5xl">
        <div className="relative mx-auto max-w-4xl border-b border-dashed border-slate-500/50 px-6 py-4 md:border-y">
          <div className="absolute -top-1.5 left-0 h-2 w-full bg-gradient-to-r from-white from-20% via-white/5 to-white to-80% dark:from-slate-800 dark:from-20% dark:via-slate-800/5 dark:to-slate-800 dark:to-80%"></div>
          <div className="absolute -bottom-1.5 left-0 h-2 w-full bg-gradient-to-r from-white from-10% via-white/5 to-white to-90% dark:from-slate-800 dark:from-10% dark:via-slate-800/5 dark:to-slate-800 dark:to-90%"></div>

          <h1 className="mx-auto text-center font-calsans text-3xl tracking-tight text-slate-900 dark:text-slate-100">
            <Balancer>{page.title}</Balancer>
          </h1>
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-4">
          <span className="mb-4 block text-center text-lg leading-8 text-slate-600 dark:text-slate-500">
            <Balancer>{page.description}</Balancer>
          </span>
        </div>
        <div className="grid gap-8 px-5 sm:grid-cols-1 md:grid-cols-3 md:px-0">
          <span className="text-blue-500"></span>
          <span className="text-green-500"></span>
          <span className="text-slate-900"></span>

          {socials?.map(
            (social, idx) =>
              social && (
                <a
                  className="block rounded-xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-md dark:bg-slate-700/50 dark:shadow-white/5 dark:ring-white/10"
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  key={idx + social.title}
                >
                  {social.icon === "GithubIcon" && (
                    <GithubIcon className={cn("h-6 w-6", social.iconColor)} />
                  )}
                  {social.icon === "TwitterIcon" && (
                    <TwitterIcon className={cn("h-6 w-6", social.iconColor)} />
                  )}
                  {social.icon === "EmailIcon" && (
                    <EmailIcon className={cn("h-6 w-6", social.iconColor)} />
                  )}

                  <h3 className="mt-3 text-base font-semibold text-slate-700 dark:text-slate-300">
                    {social.title}
                  </h3>
                  <div className="mt-4 text-sm text-slate-500">
                    {social.description}
                  </div>
                  <div className="mt-4 text-sm text-slate-700 dark:text-slate-400">
                    {social.address}
                  </div>
                </a>
              )
          )}
        </div>
      </div>
    </>
  )
}

export default ContactPage
