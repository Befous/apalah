import React from 'react'

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    )
}

export default Loading