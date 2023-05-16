import { FC, ReactNode } from "react"

interface ProjectBrowserProps {
  children: ReactNode
  url: string
}

const ProjectBrowser: FC<ProjectBrowserProps> = ({ children, url }) => {
  return (
    <>
      <div className="relative w-full rounded-2xl bg-white/20 p-2.5 shadow-sm shadow-black/5 ring-[0.8px] ring-black/5 dark:bg-white/5 dark:shadow-white/5 dark:ring-white/10">
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 opacity-[0.15] blur-lg"></div>
        <div className="relative max-w-full rounded-[0.62rem] shadow-sm shadow-black/5 ring-[0.8px] ring-black/5 dark:shadow-white/5 dark:ring-white/10">
          {/* AddressBar */}
          <div className="rounded-t-xl bg-gray-50 py-2.5 dark:bg-slate-700">
            <div className="mx-auto flex w-4/5 items-center justify-center rounded-md bg-white py-1 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
              {/* Github icon */}
              <span className="mr-1.5 hidden h-4 w-4 text-slate-600  dark:text-slate-500 md:block">
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
              </span>
              {/* Github link */}
              <a
                className="overflow-hidden truncate px-2 text-slate-500 hover:text-blue-500 dark:hover:text-sky-500"
                href={url}
                target="_blank"
                rel="noreferrer"
              >
                {url}
              </a>
            </div>
          </div>
          {/* Project body */}
          <div className="relative rounded-b-[0.62rem] border-t border-black/5 bg-white pb-8 dark:border-white/10 dark:bg-slate-800">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectBrowser
