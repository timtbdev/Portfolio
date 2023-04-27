import { Metadata } from "next"
import { contacts } from "@/config/contacts"
import { metaData } from "@/config/meta"
import { absoluteUrl, cn, constructOgImageUri } from "@/libs/utils"

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
        <div className="grid gap-8 px-5 sm:grid-cols-1 md:grid-cols-3 md:px-0">
          <span className="text-blue-500"></span>
          <span className="text-green-500"></span>
          <span className="text-slate-900"></span>
          {contacts.map((item) => (
            <a
              className="block rounded-xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-md dark:bg-slate-700/50 dark:shadow-white/5 dark:ring-white/10"
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              key={item.id + item.title}
            >
              <item.icon className={cn("h-6 w-6", item.iconColor)} />
              <h3 className="mt-3 text-base font-semibold text-slate-700 dark:text-slate-300">
                {item.title}
              </h3>
              <div className="mt-4 text-sm text-slate-500">{item.text}</div>
              <div className="mt-4 text-sm text-slate-700 dark:text-slate-400">
                {item.address}
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

export default ContactPage
