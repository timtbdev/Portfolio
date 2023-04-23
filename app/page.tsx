import Image from "next/image"
import { Project } from "@/components/"
import { bio, projects } from "@/config/"

const HomePage = () => {
  const length = projects.length
  return (
    <>
      <div className="mx-auto text-center">
        <Image
          src={bio.image}
          alt={bio.imageDescription}
          width={96}
          height={96}
          className="mx-auto mb-2 rounded-full bg-gray-100 shadow-sm shadow-gray-800/50 ring-1 ring-gray-900/5  dark:bg-neutral-800/90 dark:ring-white/10"
          priority={true}
        />

        <h1 className="mb-2 font-calsans text-4xl tracking-tight text-slate-900 dark:text-slate-100">
          {bio.title}
        </h1>

        <span className="text-lg leading-8 text-slate-600 dark:text-slate-500">
          {bio.text}
        </span>
      </div>

      {projects.map((project, idx) => (
        <Project project={project} idx={idx} length={projects.length} />
      ))}
    </>
  )
}

export default HomePage
