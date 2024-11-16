import React from 'react'
import { CgClose } from 'react-icons/cg'
export default function Buynow({ onClose }) {
  return (
    <div>buynow
        <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
    </div>
  )
}
