import { FC } from "react"

import { Project } from "types"
import { Browser, Connector, Feature, Header, Slider } from "./project/index"

interface ProjectProps {
  idx: number
  project: Project
}

const Project: FC<ProjectProps> = ({
  idx,
  project,
}) => {
  return (
    <>
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <Connector />
        {/* Body */}
        <Browser key={project.url + idx} url={project.url}>
          <div
            key={idx}
            className="relative mt-4 sm:mx-6 md:mx-10 lg:mx-12 lg:grid lg:grid-cols-2 lg:gap-4"
          >
            <div className="overflow-hidden">
              <h2 className="sr-only" id={project.title}>
                Project Overview
              </h2>
              <Header
                title={project.title}
                releaseDate={project.releaseDate}
                icon={project.icon}
                iconDescription={project.iconDescription}
                type={project.type}
              />

              <div className="mx-5 mt-6 flex flex-col gap-4  sm:mx-0 ">
                <div className="text-medium mb-2 text-gray-900 dark:text-zinc-400">
                  {project.text}
                </div>

                {project.features.map((feature, idx) => (
                  <Feature
                  key = {idx + feature.title}
                  
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
            </div>
            <div className="relative mt-10 lg:mt-0">
              <Slider images={project.images} />
            </div>
          </div>
        </Browser>
      </div>
    </>
  )
}

export default Project
