'use client'
import Link from 'next/link'
import React from 'react'
import LogoutButton from './LogoutButton'
import { useSession } from "next-auth/react"
import { Drawer } from "@material-tailwind/react"

const Navbar = () => {
    const { data: session, status } = useSession()
    const [open, setOpen] = React.useState(false)
 
    const openDrawer = () => setOpen(true)
    const closeDrawer = () => setOpen(false)
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
            <React.Fragment>
                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-ghost btn-circle" onClick={openDrawer}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </label>
                <Drawer open={open} onClose={closeDrawer} className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <Link href="https://flowbite.com/" className="flex items-center ps-2.5">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                        </Link>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" onClick={closeDrawer}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group' href="/dashboard">
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group' href="/portfolio">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 20 18">
                                    <path fillRule="evenodd" transform="translate(-4 -4)" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z" clipRule="evenodd"/>
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Portfolio</span>
                            </Link>
                        </li>
                        {session?.user.role === "owner" &&
                            <li>
                                <Link className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group' href="/users">
                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                                </Link>
                            </li>
                        }
                        <li>
                            <Link className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group' href="/mangadex">
                                <svg 
                                    viewBox="0 0 1024 1024" 
                                    width="20" 
                                    height="20" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="group transition duration-75"
                                >
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <circle cx="512" cy="512" r="512" className="fill-current text-gray-500 group-hover:text-black"></circle>
                                        <path data-name="MangaDex logo (monochrome version by krisu)" d="M735.56 566a8.71 8.71 0 0 1-8.71 8.71h-392.3a8.72 8.72 0 0 1 0-17.43h392.3a8.72 8.72 0 0 1 8.71 8.72zm-228.19 85c-1.91-1.88-3.94-3.65-6-5.34A67.23 67.23 0 0 0 453 685.23a28.93 28.93 0 0 1 15.65 9.56 29.4 29.4 0 0 1 2 2.72 28.53 28.53 0 0 1 4.47 11.88 5 5 0 0 1 .09.63 18.62 18.62 0 0 1 .2 2.74v.68a4.89 4.89 0 0 1 0 .54v.07a28.19 28.19 0 0 0 2.07 10.17 29.13 29.13 0 0 0 11.61 13.84 28.92 28.92 0 0 0 43.59-19.2 23.57 23.57 0 0 0 .46-3.37v-2.77A86.44 86.44 0 0 0 507.37 651zm219.48-60.61h-392.3a8.71 8.71 0 1 0 0 17.43h328.1v48.5l25-14.46 25 14.47v-48.56h14.27a8.71 8.71 0 0 0 0-17.43zm-90.6-46.72c2.26-1.46 4.37-3.09 6.51-4.65h-1.61c-1.67 1.47-3.32 2.98-4.9 4.6zm145.19-77.1a43.46 43.46 0 0 0-1.87-7.16l-.48-.41-.49-.41q-1.23-1.07-2.42-2.19t-2.34-2.28a14.57 14.57 0 0 0-5.05 5.15 14.42 14.42 0 0 0 12.5 21.62h.23c0-.3.1-.6.15-.9s.11-.6.14-.91q.15-1.21.21-2.45c0-.82.07-1.65.07-2.48a44.63 44.63 0 0 0-.65-7.63zm-.93 19.11a44.48 44.48 0 0 1-16.3 24.16 14 14 0 0 0-1.22.83 9.63 9.63 0 0 0-.88.65 22.53 22.53 0 0 0-7.54 11c-.11.34-.22.71-.3 1.06A22.64 22.64 0 0 1 732.72 539h-90a47.56 47.56 0 0 1 5.65-3.66c2.09-1.26 4.1-2.64 6.23-3.82l6.49-3.36a180.48 180.48 0 0 1 27.08-10.76 250.92 250.92 0 0 1 28.38-6.94c4.81-.89 9.65-1.64 14.51-2.21 4.86-.73 9.75-1.11 14.67-1.5a144.29 144.29 0 0 0-29.62.76 165.78 165.78 0 0 0-29.1 6.18 133.16 133.16 0 0 0-27.34 11.84A102.09 102.09 0 0 0 641.15 539H343.71a43.51 43.51 0 0 0-43.52 43.52c0 1 0 2 .11 2.94A43.47 43.47 0 0 0 343 626a6.67 6.67 0 0 0 .74 0 6.74 6.74 0 0 0 .74 0h102a87.09 87.09 0 0 1 24.35 3.47A86 86 0 0 1 494 640.22a74.08 74.08 0 0 0-47.48 42.28l-.84 2H322.27a81.84 81.84 0 0 1-38.14-10.48 82.36 82.36 0 0 1-42.21-72V553.9c0-5 .19-10 .59-14.92a192.2 192.2 0 0 1 111.8-160 190.2 190.2 0 0 1 62.06-16.47c5.84-.55 11.76-.83 17.73-.83a191.61 191.61 0 0 1 64.78 11.2 188.09 188.09 0 0 1 19.67 8.32c2 1 4 2 6 3.07.19-.34.4-.66.59-1q2.35-4.15 4.87-8.18t5.26-8a205.43 205.43 0 0 1 134.57-85.36 6.33 6.33 0 0 1 1-.15 2.23 2.23 0 0 1 .39 0 5.61 5.61 0 0 1 5.61 5.62 5.72 5.72 0 0 1-.16 1.32 82.78 82.78 0 0 0-64.72 92.82 155.12 155.12 0 0 1 47.18-30.06v-2a113 113 0 0 1 17.55-60.65 5.41 5.41 0 0 1-.5 1.29 98 98 0 0 0-12.18 47.44c0 1.5 0 3 .11 4.49.51.13 1 .3 1.52.43 3.18.82 6.34 1.7 9.45 2.71 1.4.46 2.76 1 4.15 1.5 2.18.78 4.37 1.55 6.5 2.42 1.57.64 3.1 1.37 4.64 2.06 1.88.84 3.76 1.67 5.6 2.58 1.63.81 3.22 1.69 4.81 2.55s3.35 1.81 5 2.78 3.25 2 4.86 3 3 1.94 4.48 3a163.5 163.5 0 0 1 4.82 3.48q2 1.52 4 3.11 2.4 1.92 4.72 3.93c1.22 1.06 2.42 2.15 3.61 3.24 1.55 1.43 3.08 2.87 4.57 4.36.39.39.77.81 1.16 1.2 1.72 1.76 3.48 3.49 5.12 5.33l.71.81a22.55 22.55 0 0 1 4.86 10.8v.13c.07.7.15 1.4.23 2.09a88 88 0 0 0 10.72 32l.13.26a88.75 88.75 0 0 0 10.78 14.81 19.47 19.47 0 0 0-6 6.33 19.22 19.22 0 0 0 15.95 28.85zm-94.12-49.12a5.5 5.5 0 0 0 5.49 5.49 5.42 5.42 0 0 0 2.44-.57 2 2 0 0 1 .48-.28l.09-.06a30.3 30.3 0 0 1 4.12-1.88 28.83 28.83 0 0 1 4.75-1.33 29.43 29.43 0 0 1 5.93-.59c.85 0 1.68 0 2.51.11a30.35 30.35 0 0 1 12.76 4 5.63 5.63 0 0 0 2.61.65 5.48 5.48 0 0 0 3-10c-.18-.11-.35-.22-.55-.33-.7-.39-1.39-.76-2.11-1.09A40.75 40.75 0 0 0 717 427c-.9-.16-1.8-.34-2.72-.44-1.08-.12-2.19-.15-3.29-.19-.42 0-.82-.07-1.24-.07a41.22 41.22 0 0 0-8.1.83c-.27.05-.54.07-.81.13a41.45 41.45 0 0 0-8.17 2.82c-1.1.5-2.24.95-3.28 1.54a5.06 5.06 0 0 0-.55.33c-.13.08-.22.2-.34.29a5.39 5.39 0 0 0-2.11 4.28zm60.06 59.79a145 145 0 0 0-29.08-5.66 166.37 166.37 0 0 0-29.75-.25 133.54 133.54 0 0 0-29.25 5.56 107 107 0 0 0-26.83 12.64c4.65-1.73 8.92-4.17 13.66-5.48 2.31-.78 4.57-1.7 6.91-2.39l7.07-1.89a181.32 181.32 0 0 1 28.77-4.66 250 250 0 0 1 29.21-.65c4.89.17 9.77.48 14.65 1 4.9.36 9.75 1.05 14.64 1.74zm4.27-8.94a144.22 144.22 0 0 0-27.92-9.91 166 166 0 0 0-29.38-4.67 133.73 133.73 0 0 0-29.77 1.17 107 107 0 0 0-28.41 8.52c4.86-1 9.44-2.8 14.33-3.39 2.4-.43 4.77-1 7.19-1.34L664 477a181.49 181.49 0 0 1 29.14-.34 250.59 250.59 0 0 1 29 3.7c4.81.9 9.59 1.93 14.34 3.14 4.81 1.06 9.52 2.5 14.24 3.87z" style={{fill:'#fff'}}></path>
                                    </g>
                                </svg>
                                <span className="ms-3">Mangadex</span>
                            </Link>
                        </li>
                    </ul>
                    {status === "unauthenticated" && 
                        <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                            <li>
                                <Link className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group' href="/login">
                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Login</span>
                                </Link>
                            </li>
                            <li>
                                <Link className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group' href="/registrasi">
                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                                        <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                                        <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Registrasi</span>
                                </Link>
                            </li>
                        </ul>
                    }
                </Drawer>
            </React.Fragment>
            </div>
            <div className="navbar-center">
                <Link href="/" className="btn btn-ghost text-xl">Befous</Link>
            </div>
            <div className="navbar-end">
                {status === "authenticated" &&
                    <details className="dropdown dropdown-end">
                        <summary className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </summary>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><LogoutButton /></li>
                        </ul>
                    </details>
                }
            </div>
        </div>
    )
}

export default Navbar