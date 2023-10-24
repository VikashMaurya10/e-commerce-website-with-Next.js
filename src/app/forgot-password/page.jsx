"use client"

import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = () => {
        axios({
            method: 'post',
            url: "/api/auth/forgot-password",
            data: { email }
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
        document.querySelector("#email").value = ""
        setEmail("")
    }
    return (
        <section className='flex items-center justify-center min-h-[90vh]  bg-gray-400/30'>
            <section className='flex items-center justify-center h-screen'>
                <div className='backdrop-blur flex items-center justify-center flex-col  gap-4 w-[350px] p-6 m-5 rounded-md bg-white'>
                    <h1 className='font-robo font-bold text-3xl text-left w-full text-red-800'>Forgot Password</h1>
                    <p className="text-base">Please enter your e-mail address. You will receive an e-mail along with a link which can be used to reset your password.</p>
                    <form className='w-full'>
                        <div className='w-full mt-4'>
                            <input
                                autoComplete='off'
                                type="email"
                                id="email"
                                placeholder='You email'
                                className='py-1 w-full bg-transparent text-black'
                                onChange={handleChange}
                            />
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

export default ForgotPassword