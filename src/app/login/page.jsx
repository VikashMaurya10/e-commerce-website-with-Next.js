'use client'

import { useAuth } from '@/context/auth-provider'
import axios from 'axios'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle } from 'react-icons/ai'
import { toast } from 'react-toastify'

const Login = () => {
  const [typePassword, setTypePassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('redirect')
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  // call context API
  const [auth, setAuth] = useAuth()

  const handlePass = () => {
    setTypePassword(!typePassword)
  }

  const handleChange = (e) => {
    const { value, id } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = async () => {
    await axios({
      method: 'post',
      url: "/api/auth/login",
      data: formData
    }).then((res) => {
      if (res.data.error) {
        toast.error(res.data.error)
      } else {
        toast.success(res.data.message)
        setAuth({
          ...auth,
          user: res?.data?.user
        })
        localStorage.setItem("user", JSON.stringify({ user: res.data.user }))
        router.push(`/${search !== null ? search : ""}`)
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <section className='flex items-center justify-center  h-[90vh] bg-gray-400/30'>
      <div className='backdrop-blur flex items-center justify-center flex-col gap-4 w-[350px] p-6 m-5 rounded-md bg-white'>
        <h1 className='font-robo font-bold text-3xl text-left w-full text-red-800'>Login</h1>
        <form className='w-full'>
          <div className='w-full mt-4'>
            <input
              autoComplete='off'
              type="email"
              placeholder='Email'
              id='email'
              className='py-1 w-full bg-transparent text-black'
              onChange={handleChange}
              value={formData.email}
            />
            <div className='w-full h-[0.1rem] bg-red-800 rounded-sm'>
            </div>
          </div>
          <div className='w-full mt-4'>
            <div className='flex gap-1'>
              <input
                autoComplete='off'
                type={typePassword ? "text" : "password"}
                placeholder='password'
                id='password'
                className=' py-1 w-full  bg-transparent text-black'
                onChange={handleChange}
                value={formData.password}
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
          <Link href={"/forgot-password"}
            className='text-blue-500 text-sm mt-2 font-medium ml-auto mr-0 block w-fit'
          >
            Forgot password?
          </Link>
          <button type='button' className='block mx-auto py-2 px-7 text-white font-semibold rounded mt-7 bg-red-800 w-full '
            onClick={handleSubmit}
          >
            Continue
          </button>
          <p className='text-black text-center mt-7'>or Connect with Social Media</p>
          <button type='button' className='flex items-center gap-4 mx-auto py-2 px-7 text-white font-semibold rounded mt-3 bg-red-800 w-full text-center'>
            <AiOutlineGoogle className='text-2xl' />Login with Googole</button>
          <p className='text-sm mt-2 text-center'>
            Do not have an account?{" "}
            <Link href={"/signup"}
              className='text-blue-500'
            >Signup</Link>
          </p>
        </form>
      </div>

    </section >
  )
}

export default Login