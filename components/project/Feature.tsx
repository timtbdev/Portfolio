import { FC } from "react"

interface FeatureProps {
  title: string
  description: string
}

const Feature: FC<FeatureProps> = ({ title, description }) => {
  return (
    <>
      <div className="flex flex-col gap-0.5">
        <p className="font-calsans text-lg leading-6 text-slate-800 dark:text-slate-200">
          {title}
        </p>
        <dd className="text-medium text-slate-600 dark:text-slate-400">
          {description}
        </dd>
      </div>
    </>
  )
}

export default Feature
