import { Metadata } from "next"
import Image from "next/image"
import {
  Connector,
  Decorator,
  Link,
  Number,
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
      <div className="relative overflow-hidden pb-8">
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center text-lg ">
            <Connector />
            <Number number={1} className="mb-8 opacity-70 md:mb-6" />
            <Title className="mb-8 md:mb-6">
              Oh{" "}
              <span className="text-highlight-blue dark:text-highlight-sky">
                Hello
              </span>{" "}
              there,
            </Title>
            <Text className="mb-8 md:mb-6">
              My name is Tim, and I&apos;m and Android and Frontend developer
              based in Hawyard, California. I was born and grew up in Mongolia,
              and studied Computer Science in Germany.
            </Text>
            <Photo image={MeImage} description="Profile picture" />
            <Connector className="opacity-70" />
            <Number number={2} className="mb-2 md:mb-4" />
            <Title className="mb-8 md:mb-6">
              <Decorator>Build.</Decorator>
            </Title>
            <Text className="mb-2 md:mb-4">
              I started learning Android and Frontend development in 2017 and
              launched 2 mobile and 2 web apps and open-sourced them on GitHub.
              I enjoy making smooth and fun UI with modern tools like Kotlin,
              Jetpack Compose, TypeScript, Next.js, React and Tailwind Css.
            </Text>
            <Text>
              Currently, I&apos;ve been working on personal projects such as
            </Text>
            <Text className="mb-2 md:mb-4">
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
            <Text className="mb-2 md:mb-4">
              Outside of Android, I&apos;m a passionate runner, husband, and
              dad.
            </Text>
            <Photo
              image={FamilyImage}
              description="Wedding picture"
              className="relative z-50"
            />
            <Connector className="opacity-70" />
            <Number number={3} className="mb-2 md:mb-4" />
            <Title className="mb-6 md:mb-8">Connect.</Title>
            <Text>Anyway, that&apos;s enough about me.</Text>
            <Text className="mb-2 md:mb-4">
              I&apos;m looking for an entry-level Android or Frontend
              engineering role. If you think I might be a good fit for your
              organization, shoot me an email at
            </Text>
            <Link
              title="timtb.dev@gmail.com"
              href="mailto:timtb.dev@gmail.com"
              className="mb-2 md:mb-4"
            ></Link>
            <Text>and let&apos;s chat.</Text>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage
