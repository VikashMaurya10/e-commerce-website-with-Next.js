import React from 'react'
import { CgSpinner } from "react-icons/cg"
const Loading = () => {
    return (
        <div className='grid place-items-center h-screen'>
            <button type="button" className="flex items-center gap-3 rounded" disabled>
                <CgSpinner className="animate-spin text-4xl text-indigo-600" />
                Processing...
            </button>
        </div>
    )
}

export default Loading