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
      <div className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-200">
              Contact me
            </h2>
            <p className="mt-6 text-center text-lg leading-8 text-slate-600 dark:text-slate-500">
              Get in touch with me anytime, through email or social media.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {contact.map((item) => (
              <Address
                id={item.id}
                title={item.title}
                href={item.href}
                address={item.address}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactPage
