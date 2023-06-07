import { FC, ReactNode } from "react"

interface TableBodyHeadProps {
  headers: string[]
}

const TableBodyHead: FC<TableBodyHeadProps> = ({ headers }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {headers.map((title, idx) => (
          <th
            key={idx + title}
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableBodyHead
