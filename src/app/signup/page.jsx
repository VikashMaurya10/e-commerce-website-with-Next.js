'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { toast } from 'react-toastify'

const Signup = () => {
    const router = useRouter()
    const [typePassword, setTypePassword] = useState(false)
    const [getInput, setGetInput] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    })

    const handlePass = () => {
        setTypePassword(!typePassword)
    }

    const handleChange = (e) => {
        const { value, id } = e.target
        setGetInput({
            ...getInput, [id]: value
        })
    }

    const handleSubmit = async () => {
        await axios({
            method: 'post',
            url: "/api/auth/signup",
            data: getInput
        }).then((res) => {
            if (res?.data?.error) {
                toast.error(res.data.error)
            } else {
                toast.success(res.data.message)
                router.push("/login")
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <section className='flex items-center justify-center h-[90vh] bg-gray-400/30'>
            <div className='backdrop-blur flex items-center justify-center flex-col gap-4 w-[350px]  p-6 m-5 rounded-md bg-white '>
                <h1 className='font-robo font-bold text-3xl text-left w-full text-red-800'>Signup</h1>
                <form className='w-full'>
                    <div className='w-full mt-4'>
                        <input
                            autoComplete='off'
                            type="text"
                            placeholder='Your name'
                            id='name'
                            value={getInput.name}
                            onChange={handleChange}
                            className=' py-1 w-full bg-transparent text-black'
                        />
                        <div className='w-full h-[0.1rem] rounded-sm bg-red-800'>
                        </div>
                    </div>
                    {/* email */}
                    <div className='w-full mt-4'>
                        <input
                            autoComplete='off'
                            type="email"
                            placeholder='Email'
                            id='email'
                            value={getInput.email}
                            onChange={handleChange}
                            className=' py-1 w-full bg-transparent text-black'
                        />
                        <div className='w-full h-[0.1rem] rounded-sm bg-red-800'>
                        </div>
                    </div>
                    {/* pass */}
                    <div className='w-full mt-4'>
                        <div className='flex gap-1'>
                            <input
                                autoComplete='off'
                                type={typePassword ? "text" : "password"}
                                placeholder='Password'
                                id='password'
                                value={getInput.password}
                                onChange={handleChange}
                                className=' py-1 w-full  bg-transparent text-black'
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
                        <div className='w-full h-[0.1rem] rounded-sm bg-red-800'></div>
                    </div>
                    <div className='w-full mt-4'>
                        <input
                            autoComplete='off'
                            type="text"
                            placeholder='Address'
                            id='address'
                            value={getInput.address}
                            onChange={handleChange}
                            className=' py-1 w-full bg-transparent text-black'
                        />
                        <div className='w-full h-[0.1rem] rounded-sm bg-red-800'>
                        </div>
                    </div>
                    <div className='w-full mt-4'>
                        <input
                            autoComplete='off'
                            type="number"
                            placeholder='Phone'
                            id='phone'
                            value={getInput.phone}
                            onChange={handleChange}
                            className='py-1 w-full bg-transparent text-black appearance-none'
                        />
                        <div className='w-full h-[0.1rem] rounded-sm bg-red-800'>
                        </div>
                    </div>
                    <p className='text-sm mt-2 text-center'>
                        Already have an account? {' '}
                        <Link href={"/login"}
                            className='text-blue-500'
                        >Login</Link>
                    </p>
                    {/*continue btn  */}
                    <button
                        type='button'
                        onClick={handleSubmit}
                        className='block mx-auto py-2 px-7 bg-red-800 text-white font-semibold rounded mt-7 w-full '
                    >
                        Continue
                    </button>
                </form>
            </div>
        </section >
    )
}

export default Signup