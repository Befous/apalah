import React from 'react'
import Link from 'next/link'

const AcccessDenied = () => {
    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-white">
            <div className="xl:max-w-7xl bg-white drop-shadow-xl border border-black/20 w-[800px] rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
                <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
                    <div className="w-full mt-5 sm:mt-8">
                        <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5 text-center">
                            <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
                            <p className="mt-4 text-lg text-gray-700">You do not have permission to access this page.</p>
                            <div className="mt-6">
                                <Link href="/" className="btn btn-primary">Go to Homepage</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AcccessDenied