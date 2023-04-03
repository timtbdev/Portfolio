import { Inter } from "next/font/google"
import { Heading, Project } from "@/components"

import { projects } from "../config/projects"

const inter = Inter({ subsets: ["latin"] })

const Home = () => {
  return (
    <>
      <div className="relative isolate">
        <Heading />

        {projects.map((project, idx) => (
          <Project project={project} idx={idx} />
        ))}
      </div>
    </>
  )
}

export default Home
