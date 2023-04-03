import { Avatar } from "@/components"

import { profile } from "@config/index"

const Heading = () => {
  return (
    <>
      <>
        <div className="flex flex-col place-items-center gap-6 py-8">
          <div className="flex justify-center">
            <Avatar
              image={profile.image}
              description={profile.description}
              large={true}
            />
          </div>
          <h2 className="font-display text-center font-calsans text-4xl font-extrabold leading-8 tracking-tight text-slate-900 dark:text-slate-200">
            Hello
          </h2>
          <h2 className="mx-auto max-w-3xl px-4 text-center text-2xl font-semibold text-slate-600 dark:text-slate-400">
            <p>
              I&apos;m
              <span className="text-highlight-orange dark:text-highlight-sky text-slate-800 dark:text-slate-200">
                Tim
              </span>
              and, an
              <span className="text-highlight-rose text-slate-800 dark:text-slate-200">
                San Francisco
              </span>
              based
              <span className="text-highlight-green text-slate-800 dark:text-slate-200">
                Android developer.
              </span>
            </p>
          </h2>
        </div>
      </>
    </>
  )
}

export default Heading
