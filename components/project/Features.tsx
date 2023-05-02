import { FC } from "react"

interface FeaturesProps {
  features: Array<string>
}

const Features: FC<FeaturesProps> = ({ features }) => {
  const titles: Array<string> = ["Components", "Libraries", "Backend"]
  return (
    <>
      <div className="relative p-3">
        <div className="relative mt-6 flex flex-col gap-4 rounded-xl border border-dashed border-slate-500/50 p-4 sm:mx-0 ">
          <div className="text-normal absolute left-2.5 top-0 -translate-y-1/2 bg-white px-2 font-normal text-slate-500 dark:bg-slate-800">
            Features
          </div>

          {features.map((feature, idx) => (
            <div key={idx + feature} className="flex flex-col gap-1.5">
              <p className="text-lg font-semibold leading-6 text-slate-800 dark:text-slate-200">
                {titles[idx]}
              </p>
              <dd className="text-medium text-slate-600 dark:text-slate-400">
                {feature}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Features
