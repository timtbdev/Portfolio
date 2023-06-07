import { FC } from "react"
import { DocumentArrowDownIcon, PhotoIcon } from "@heroicons/react/24/outline"

interface UploadDragDropZoneProps {
  active: boolean
}

const UploadDragDropZone: FC<UploadDragDropZoneProps> = ({ active }) => {
  return active ? (
    <div key="icon_arrow_down_icon" className="text-center">
      <DocumentArrowDownIcon
        className="mx-auto h-12 w-12 text-gray-300"
        aria-hidden="true"
      />
      <div className="mt-4 flex text-sm leading-6 text-gray-600">
        <p className="pl-1">Drop your file here.</p>
      </div>
    </div>
  ) : (
    <div key="icon_photo_icon" className="text-center">
      <PhotoIcon
        className="mx-auto h-12 w-12 text-gray-300"
        aria-hidden="true"
      />
      <div className="mt-4 flex text-sm leading-6 text-gray-600">
        <p className="pl-1">Drag and drop a file here.</p>
      </div>
      <p className="text-xs leading-5 text-gray-600">
        PNG, JPG, GIF up to 10MB
      </p>
    </div>
  )
}

export default UploadDragDropZone
