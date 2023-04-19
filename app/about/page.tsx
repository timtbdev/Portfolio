import { Metadata } from "next"
import {
  Connector,
  Decorator,
  Link,
  Photo,
  Text,
  Title,
} from "@/components/blog"
import { metaData } from "@/config/meta"
import { absoluteUrl, constructOgImageUri } from "@/libs/utils"
import FamilyImage from "@/public/family.jpg"
import MeImage from "@/public/me.jpg"

export const metadata: Metadata = {
  title: "About",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/about"),
    title: metaData.title,
    description: metaData.description,
    siteName: metaData.title,
    images: [
      {
        url: constructOgImageUri(
          metaData.ogTitle,
          "About",
          metaData.tags,
          "/about"
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
      constructOgImageUri(metaData.ogTitle, "About", metaData.tags, "/about"),
    ],
    creator: metaData.author.twitterAddress,
  },
}

const AboutPage = () => {
  return (
    <>
      <div className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <Title className="mb-4 text-start sm:mb-6 sm:text-center">
              Oh Hello there,
            </Title>
            <Text className="mb-4 sm:mb-6">
              My name is Tim. I&apos;m an Android and Frontend developer based
              in Hayward, California. I was born and grew up in Mongolia, and
              studied Computer Science in Germany.
            </Text>
            <Photo
              image={MeImage}
              description="Profile picture"
              className="mx-auto text-center"
            />
            <figcaption className="my-4 text-sm text-slate-400 dark:text-slate-500 sm:mb-6">
              And this is what I look like. Ulaanbaatar, Mongolia, 2016
            </figcaption>
            <Title className="mb-4 sm:mb-6">
              <Decorator>Build.</Decorator>
            </Title>
            <Text className="mb-4 sm:mb-6">
              I started learning Android and Frontend development in 2017. I
              have been launched 2 mobile and 2 web apps, open-sourced them on
              GitHub. I enjoy making fun and smooth UI&apos;s with modern tools
              like Jetpack Compose, Next.js and Tailwind Css.
            </Text>
            <Text>
              Currently, I&apos;ve been working on personal projects such as
            </Text>
            <Text className="mb-4 sm:mb-6">
              <a
                className="... text-blue-500 after:content-['_↗'] dark:text-sky-500"
                href="https://www.andy.mn"
                target="_blank"
              >
                Andy
              </a>{" "}
              and{" "}
              <a
                className="... text-blue-500 after:content-['_↗'] dark:text-sky-500"
                href="https://www.signapp.net"
                target="_blank"
              >
                Sign App
              </a>{" "}
            </Text>
            <Text className="mb-4 sm:mb-6">
              Outside of Android, I&apos;m a passionate runner, husband, and
              dad.
            </Text>
            <Photo
              image={FamilyImage}
              description="Wedding picture"
              className="mx-auto text-center"
            />
            <figcaption className="my-4 text-sm text-slate-400 dark:text-slate-500 sm:mb-6">
              City hall wedding. Ulaanbaatar, Mongolia, 2023
            </figcaption>
            <Title className="mb-4 sm:mb-6">
              <span className="text-highlight-blue dark:text-highlight-sky text-slate-800 dark:text-slate-200">
                Connect.
              </span>
            </Title>
            <Text>Anyway, that&apos;s enough about me.</Text>
            <Text className="mb-2 md:mb-4">
              I&apos;m looking for an entry-level Android or Frontend
              engineering role. If you think I might be a good fit for your
              organization, shoot me an email at timtb.dev@gmail.com and
              let&apos;s chat.
            </Text>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage
