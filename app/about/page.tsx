import Image from "next/image"
import { Number } from "@/components/blog"
import Connector from "@/components/project/Connector"

const AboutPage = () => {
  return (
    <>
      <div className="relative overflow-hidden py-16">
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-center text-lg ">
            <Number number={1} />
            <h1>
              <span className="mt-6 block font-calsans text-6xl tracking-tight text-slate-900 dark:text-slate-100 md:mt-8">
                Oh{" "}
                <span className="line-through decoration-blue-500 dark:decoration-sky-500">
                  Hello
                </span>{" "}
                there,
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-500 md:mt-8">
              My name is Tim, and I&apos;m and Android developer based in San
              Francisco. I was born and grew up in Mongolia, and studied
              Computer Science in Germany.
            </p>
            <div className="ring-trisma dark:ring-trisma-dark mx-auto my-6 max-w-3xl overflow-hidden rounded-xl md:mt-8">
              <Image
                className="w-full rounded-lg"
                src="/me.jpg"
                alt="Profile picture"
                width={800}
                height={600}
                priority
              />
            </div>
            <Connector />
            <Number number={2} />
            <h1>
              <span className="mt-6 block font-calsans text-6xl tracking-tight text-slate-900 dark:text-slate-200 md:mt-8">
                <p className="line-through decoration-blue-500">Build.</p>
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400 md:mt-8">
              I started learning Android development in 2017 and launched 2 apps
              on Google Play Store and open-sourced them on GitHub.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400 md:mt-8">
              I enjoy making smooth and fun Android UI with modern tools like
              Jetpack Compose. Also, I care about building accessible user
              interfaces.
            </p>
            <button
              type="button"
              className="group mt-6 whitespace-nowrap rounded-lg bg-slate-200/30 px-4 py-1.5 font-mono font-medium text-slate-600 transition-all md:mt-8"
            >
              <a target="_blank" href="http://tremor.so">
                <div className="inline-flex items-center space-x-1 text-sm">
                  <span>Please visit my Github Account</span>
                  <svg
                    className="h-4 w-4 rounded bg-none text-blue-500 transition-all"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    ></path>
                  </svg>
                </div>
              </a>
            </button>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400 md:mt-8">
              Currently, I&apos;m working on personal projects to improve my
              Android and Kotlin skills.
            </p>
            <div className="ring-trisma dark:ring-trisma-dark mx-auto mt-6 max-w-3xl overflow-hidden rounded-xl md:mt-8">
              <Image
                className="w-full rounded-lg"
                src="/family.jpg"
                alt="Profile picture"
                width={800}
                height={600}
                priority
              />
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400 md:mt-8">
              Anyway, that&apos;s enough about me.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400 md:mt-8">
              I&apos;m looking for an entry-level Android engineering role. If
              you think I might be a good fit for your organization, shoot me an
              email at{" "}
              <a
                href="mailto:timtb.dev@gmail.com"
                className=" text-blue-500 underline hover:text-blue-600 hover:no-underline dark:text-sky-500 dark:hover:text-sky-600"
              >
                timtb.dev@gmail.com
              </a>{" "}
              and let&apos;s chat.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage
