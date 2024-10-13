'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Registrasi() {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async(e: { preventDefault: () => void }) => {
        e.preventDefault()

        if (!name) {
            setError('Isi nama dengan benar!')
            return
        }
        if (!username) {
            setError('Isi username dengan benar!')
            return
        }
        if (!password) {
            setError('Isi password dengan benar!')
            return
        }
        if (!confirmpassword) {
            setError('Isi confirm password dengan benar!')
            return
        }
        if (password !== confirmpassword) {
            setError('Password dan Confirm Password harus sama!')
            return
        }

        setLoading(true)
        setError('')

        try {
            const response = await fetch('api/registrasi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    username,
                    password,
                    role: 'user',
                }),
            })

            if (!response.ok) {
                const { message } = await response.json()
                throw new Error(message)
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setLoading(false)
            router.push('/login')
        }
    }

    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-white">
            {loading &&(
                <div className="flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}
            <div className="xl:max-w-7xl bg-white drop-shadow-xl border border-black/20 w-[800px] rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
                <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-center text-2xl sm:text-3xl font-semibold">
                            Registrasi
                        </h1>
                        <div className="w-full mt-5 sm:mt-8">
                            <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                                <label className="input input-bordered flex items-center gap-2">
                                    Name
                                    <input onChange={e => setName(e.target.value)} type="text" className="grow" placeholder="Daisy" />
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                    </svg>
                                    <input onChange={e => setUsername(e.target.value)} type="text" className="grow" placeholder="Username" />
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                        fillRule="evenodd"
                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                        clipRule="evenodd" />
                                    </svg>
                                    <input onChange={e => setPassword(e.target.value)} type="password" className="grow" placeholder="********" />
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    Confirm
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70 flex-shrink-0">
                                        <path
                                        fillRule="evenodd"
                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                        clipRule="evenodd" />
                                    </svg>
                                    <input onChange={e => setConfirmPassword(e.target.value)} type="password" className="grow" placeholder="********" />
                                </label>
                                {error && (
                                    <span className="label-text text-red-600">{error}</span>
                                )}
                                <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                                    <button className="btn btn-active btn-primary btn-block max-w-[200px]">
                                        Registrasi
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
