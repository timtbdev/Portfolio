import { Avatar } from "@/components"
import { MouseIcon } from "@/icons"
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
          <h2 className="text-center font-calsans text-4xl font-extrabold leading-8 tracking-tight text-slate-900 dark:text-slate-200">
            Hello
          </h2>
          <h2 className="mx-auto max-w-3xl px-4 text-center text-xl font-medium text-slate-600 dark:text-slate-400">
            <p className="mb-2">My name is Tim.</p>
            <p className="mb-2">
              I am an
              <span className="text-highlight-green text-slate-800 dark:text-slate-200">
                Android
              </span>{" "}
              &{" "}
              <span className="text-highlight-blue dark:text-highlight-sky text-slate-800 dark:text-slate-200">
                Frontend
              </span>
              Developer based in Hayward, CA.
            </p>
            <p className="mb-2">This is my Portfolio.</p>
          </h2>
          <MouseIcon className="h-9 w-9 animate-bounce text-slate-500 opacity-50 dark:text-slate-500" />
        </div>
      </>
    </>
  )
}

export default Heading
