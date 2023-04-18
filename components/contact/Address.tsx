import { FC } from "react"

import { AddressAttributes } from "types"

type AddressProps = AddressAttributes

const Address: FC<AddressProps> = ({ id, title, address, href }) => {
  return (
    <div
      key={id + title}
      className="rounded-2xl bg-gray-50 p-10 dark:bg-slate-700/50"
    >
      <h3 className="text-base font-semibold leading-7 text-slate-600 dark:text-slate-400">
        {title}
      </h3>
      <dl className="mt-3 space-y-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
        <div>
          <dt className="sr-only">{title}</dt>
          <dd>
            <a
              className="font-semibold text-blue-500 after:content-['_↗'] dark:text-sky-500"
              href={href}
              target="_blank"
            >
              {href}
            </a>
          </dd>
        </div>
        <div className="mt-1 font-medium">
          <dt className="sr-only">{address}</dt>
          <dd>{address}</dd>
        </div>
      </dl>
    </div>
  )
}

export default Address
