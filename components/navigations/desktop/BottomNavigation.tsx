import { footer } from "@/config/footer"

export default function BottomNavigation() {
  return (
    <>
      <div className="bottom-0 left-0 border-t-[1.5px] border-slate-300/50 bg-gray-50 shadow-t-sm dark:border-slate-600/50 dark:bg-slate-800 dark:shadow-slate-900 md:sticky">
        <div className="mx-auto max-w-7xl px-6 py-3  md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {footer.socials.map((item, idx) => (
              <a
                key={idx + item.name}
                href={item.href}
                className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="mt-4 md:order-1 md:mt-0">
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              &copy; {footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
