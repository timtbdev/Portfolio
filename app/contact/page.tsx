import { Metadata } from "next"
import { Text, Title } from "@/components/blog"
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
            <Title className="mb-8 text-center md:mb-6">Contact</Title>
            <Text className="mb-8 text-center md:mb-6">
              Get in touch with me anytime, through email or social media.
            </Text>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
              {contact.map((item) => (
                <Address
                  id={item.title}
                  title={item.title}
                  href={item.href}
                  address={item.address}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactPage
