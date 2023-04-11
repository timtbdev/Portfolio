import { FC, ReactNode } from "react"

interface BrowserProps {
  children: ReactNode
  url: string
}

const Browser: FC<BrowserProps> = ({ children, url }) => {
  return (
    <>
      <div className="relative mb-20 px-5 pt-10 md:pt-0">
        <div className="absolute inset-x-0 top-0 bg-top bg-no-repeat xl:top-14"></div>
        <div className="mx-auto max-w-7xl sm:px-10 md:px-8">
          <div className="sm:px-2 xl:mt-0">
            <div className="relative">
              <div className="width: 1200px ring-trisma dark:ring-dark-trisma min-w-full max-w-full rounded-xl">
                <div className="dark:highlight-white/10 rounded-t-xl bg-gray-50 dark:border-zinc-700/40 dark:bg-slate-700 dark:bg-none">
                  <div className="grid-template-columns: 7.125rem 1fr 7.125rem grid items-center px-4 py-2.5">
                    <div className="hidden md:flex md:items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-800 sm:h-2.5 sm:w-2.5"></div>
                      <div className="ml-1.5 h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-800 sm:h-2.5 sm:w-2.5"></div>
                      <div className="ml-1.5 h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-800 sm:h-2.5 sm:w-2.5"></div>
                    </div>
                    <div>
                      <div className="group mx-auto flex w-4/5 items-center justify-center rounded-md border-slate-200 bg-white py-1 text-sm font-medium leading-6 ring-1 ring-inset ring-slate-900/5 dark:border-zinc-700/40 dark:bg-slate-800 dark:text-slate-200">
                        <span className="mr-1.5 hidden h-4 w-4 text-slate-600 group-hover:text-blue-500 dark:text-slate-500 dark:group-hover:text-sky-500 md:block">
                          <svg
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                          </svg>
                        </span>
                        <a
                          className="truncate text-slate-600 group-hover:text-blue-500 dark:text-slate-500 dark:group-hover:text-sky-500"
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {url}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative -mb-8 rounded-b-xl border-t border-slate-200 bg-white pb-8 dark:border-slate-700 dark:bg-slate-800">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Browser
