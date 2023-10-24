"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle } from 'react-icons/ai'
import { useSearchParams } from "next/navigation"


const Updatepassword = () => {
    const [typePassword, setTypePassword] = useState(false)
    const [password, setpassword] = useState("")
    const [Token, setToken] = useState("")

    const searchParams = useSearchParams()
    const handleChange = (e) => {
        setpassword(e.target.value)
    }

    const handlePass = () => {
        setTypePassword(!typePassword)
    }

    useEffect(() => {
        const token = searchParams.get("token")
        console.log(token);
        setToken(token)
    }, [searchParams])

    const handleSubmit = async () => {
        await axios({
            method: 'POST',
            url: "/api/auth/update-password",
            data: {
                password: password,
                token: Token
            }
        }).then((res) => {
            console.log(res);
            if (res?.data?.error) {
                toast.error(res?.data?.error)
            } else {
                toast.success(res?.data?.message)
            }
        }).catch((error) => {
            console.log(error);
        })
        setpassword("")
    }

    return (
        <section className='flex items-center justify-center h-full bg-gray-400/30'>
            <section className='flex items-center justify-center h-screen'>
                <div className='backdrop-blur flex items-center justify-center flex-col  gap-4 w-[350px] p-6 m-5 rounded-md bg-white'>
                    <h1 className='font-robo font-bold text-3xl text-left w-full text-red-800'>Forgot Password</h1>
                    <p className="text-base">Please enter your e-mail address. You will receive an e-mail along with a link which can be used to reset your password.</p>
                    <form className='w-full'>
                        <div className='w-full mt-4'>
                            <div className='flex gap-1'>
                                <input
                                    autoComplete='off'
                                    type={typePassword ? "text" : "password"}
                                    placeholder='password'
                                    id='password'
                                    className=' py-1 w-full  bg-transparent text-black'
                                    onChange={handleChange}
                                    value={password}
                                />
                                <button
                                    type='button'
                                    onClick={handlePass}
                                    className='text-lg '
                                >
                                    {
                                        typePassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                                    }
                                </button>
                            </div>
                            <div className='w-full h-[0.1rem] bg-red-800 rounded-sm'></div>
                        </div>
                        <button
                            type='button'
                            className='block mx-auto py-2 px-7 text-white font-semibold rounded mt-7 bg-red-800 w-full '
                            onClick={handleSubmit}
                        >
                            Continue
                        </button>
                    </form>
                </div>

            </section >
        </section>
    )
}

export default Updatepassword