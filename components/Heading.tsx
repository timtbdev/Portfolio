import { Avatar } from "@/components"
import ProfileImage from "@/public/profile.jpg"

const Heading = () => {
  return (
    <>
      <>
        <div className="flex flex-col place-items-center gap-6 py-2 md:py-8">
          <div className="mt-6 flex justify-center sm:mt-8">
            <Avatar
              image={ProfileImage}
              description="Profile image"
              large={true}
            />
          </div>
          <h2 className="text-center font-calsans text-5xl font-extrabold leading-8 tracking-tight text-slate-900 dark:text-slate-200">
            Hello
          </h2>
          <h2 className="mx-auto max-w-3xl px-4 text-center text-xl font-medium text-slate-600 dark:text-slate-400">
            <p className="mb-2">I&apos;m Tim, and welcome to my portfolio.</p>
          </h2>
        </div>
      </>
    </>
  )
}

export default Heading
