import { FC, ReactNode } from "react"
import { CheckBadgeIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline"

interface UploadProgressProps {
  done?: boolean
  children?: ReactNode
}

const UploadProgress: FC<UploadProgressProps> = ({ done = false, children }) => {
  return done ? (
    <div
      key="success_icon"
      className="ml-4 flex basis-1/2 flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
    >
      <CheckBadgeIcon
        className="mx-auto h-12 w-12 text-gray-300"
        aria-hidden="true"
      />
      <div className="mt-4 flex text-sm font-semibold leading-6 text-green-600">
        <p className="pl-1">Successfully uploaded</p>
      </div>
    </div>
  ) : (
    <div
      key="upload_icon"
      className="ml-4 flex basis-1/2 flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
    >
      <CloudArrowUpIcon
        className="mx-auto h-12 w-12 text-gray-300"
        aria-hidden="true"
      />
      {children}
      <div className="mt-4 flex text-sm font-semibold leading-6 text-slate-600">
        <p className="pl-1">Uploading ...</p>
      </div>
    </div>
  )
}

export default UploadProgress
