import Image from "next/image"
import { Project } from "@/components/"
import { allPages, allProjects } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import Balancer from "react-wrap-balancer"

const HomePage = async () => {
  const page = allPages.find((page) => page.slugAsParams === "home")

  if (!page) {
    return null
  }

  const projects = allProjects.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return (
    <>
      <div className="mx-auto mb-4 text-center">
        <Image
          src={page.image ?? ""}
          alt={page.imageAlt ?? ""}
          width={96}
          height={96}
          className="mx-auto mb-2 rounded-full bg-gray-100 shadow-sm shadow-gray-800/50 ring-1 ring-gray-900/5  dark:bg-neutral-800/90 dark:ring-white/10"
          priority={true}
        />

        <h1 className="mb-2 font-calsans text-4xl tracking-tight text-slate-900 dark:text-slate-100">
          <Balancer>{page.title}</Balancer>
        </h1>

        <span className="text-lg leading-8 text-slate-600 dark:text-slate-500">
          <Balancer>{page.description}</Balancer>
        </span>
      </div>

      {projects.map((project, idx) => (
        <Project
          id={project._id}
          title={project.title}
          icon={project.icon}
          screenshot={project.screenshot}
          url={project.url}
          date={project.date}
          tags={project.tags}
          features={project.features}
          line={idx === projects.length - 1}
        />
      ))}
    </>
  )
}

export default HomePage
