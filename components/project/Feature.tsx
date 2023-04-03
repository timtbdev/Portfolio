import { FC } from "react"

interface FeatureProps {
  key: number
  title: string
  description: string
}

const Feature: FC<FeatureProps> = ({ key, title, description }) => {
  return (
    <>
      <div key={key} className="flex flex-col gap-0.5">
        <p className="font-calsans text-lg leading-6 text-gray-900 dark:text-zinc-200">
          {title}
        </p>
        <dd className="text-medium text-gray-900 dark:text-zinc-400">
          {description}
        </dd>
      </div>
    </>
  )
}

export default Feature
