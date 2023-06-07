import { FC, ReactNode } from "react"
import { Icons } from "@/components/ui/icons"

interface TableEmptyProps {
  title: string
  description: string
  emptyTitle: string
  emptyDescription: string
  children: ReactNode
}

const TableEmpty: FC<TableEmptyProps> = ({
  title,
  description,
  emptyTitle,
  emptyDescription,
  children,
}) => {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              {title}
            </h1>
            <p className="mt-2 text-sm text-gray-700">{description}</p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                <div className="py-10 text-center">
                  <Icons.empty />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">
                    {emptyTitle}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {emptyDescription}
                  </p>
                  <div className="mt-6">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TableEmpty
