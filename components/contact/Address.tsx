import { FC } from "react"
import {Address} from "types"

type AddressProps = Address

const Address: FC<AddressProps> = ({ id, title, address, href }) => {
  return (
    <>
      <div key={id + title}>
        <h3 className="border-l border-blue-600 pl-6 font-semibold text-slate-900 dark:border-sky-600 dark:text-slate-200">
          {title}
        </h3>
        <address className="border-l border-gray-200 pl-6 pt-2 not-italic text-blue-500 dark:text-sky-500">
          <p className="after:content-['_↗'] ">
            <a href={href} target="_blank">
              {address}
            </a>
          </p>
        </address>
      </div>
    </>
  )
}

export default Address
