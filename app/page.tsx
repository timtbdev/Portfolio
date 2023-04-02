import { Inter } from "next/font/google"
import { Heading } from "@/components"

const inter = Inter({ subsets: ["latin"] })

const Home = () => {
  return (
    <>
      <div className="relative isolate">
        <Heading />
      </div>
    </>
  )
}

export default Home
