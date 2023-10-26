"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/auth-provider'
import { toast } from 'react-toastify'
import axios from 'axios'
import { FaShopify, FaUserCircle } from 'react-icons/fa'
import { CgMenuRightAlt, CgClose } from 'react-icons/cg'
import { BsCaretDownFill } from "react-icons/bs"



const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const pathname = usePathname()
  const [auth, setAuth] = useAuth()

  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

  const navLink = [
    {
      linkTitle: "home",
      to: "/"
    },
    {
      linkTitle: "category",
      to: "/category"
    },
    {
      linkTitle: "cart",
      to: "/cart"
    },
    {
      linkTitle: "signup",
      to: "/signup"
    },
    {
      linkTitle: "login",
      to: "/login"
    },
  ]

  const profileDropDown = [
    {
      linkTitle: "dashboard",
      to: `/dashboard/${auth?.user?.role == 1 ? "admin" : "user"}`
    },
    {
      linkTitle: "logout",
      to: "/login"
    }
  ]

  const handelLogout = async () => {
    setAuth({
      user: null,
    })

    await axios({
      method: 'get',
      url: "/api/auth/logout"
    }).then((res) => {
      localStorage.clear("user")
      toast.success(res.data.message)
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <header className='text-black bg-gray-100 py-4 capitalize font-medium shadow-lg'>
      <nav className='relative flex items-center justify-between sm:max-w-[80%] max-w-[90%] mx-auto'>
        <Link href={"/"}><FaShopify className='text-5xl text-red-700' /></Link>
        {/* desktop nav */}
        <div className='hidden sm:flex gap-4'>
          {
            navLink.map((item, i) => {
              return (
                <Link key={i} href={item.to} className={`text-lg ${pathname == item.to ? "text-red-600" : ""} ${auth.user && (item.linkTitle == "login" || item.linkTitle == "signup") ? "hidden" : ''}`}>
                  {item.linkTitle}
                </Link>
              )
            })
          }
          {auth.user !== null ? <>

            <div className='group'>
              <h2 className='flex items-center gap-1 cursor-pointer'>
                <span><FaUserCircle className='text-red-800 text-2xl inline' />{" "}
                  {auth?.user?.name?.slice(0, 6)}
                </span> <BsCaretDownFill className='text-red-800 group-hover:rotate-180 transition-all duration-300' />
              </h2>
              <div className='absolute min-w-fit top-full right-0 grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300'>
                <div className='overflow-hidden'>
                  <ul className='mt-6 px-7 py-3 bg-gray-200 rounded w-fit'>
                    {profileDropDown.map((value, i) => {
                      return (
                        <Link key={i} href={value.to}
                          className='block'
                          onClick={() => {
                            if (value.linkTitle == "logout") {
                              handelLogout()
                            }
                          }}
                        >
                          {value.linkTitle}
                        </Link>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </> : <></>}

        </div>

        {/* mobile nav */}
        <button className='sm:hidden block z-20' onClick={handleMenu}>
          {
            showMenu ? <CgClose className='text-3xl' /> : <CgMenuRightAlt className='text-3xl' />
          }
        </button>
      </nav>
      <div className={`mobilenav z-10 sm:hidden block absolute right-0 h-screen bg-gray-900/20 top-0 ${showMenu ? "w-full" : "w-0"} transition-all duration-500 overflow-hidden`}
        onClick={(e) => {
          if (!e.target.classList.contains('links')) {
            setShowMenu(!showMenu)
          }
        }}
      >
        <div className='links bg-gray-200 h-screen flex flex-col gap-1 text-base w-[70%] mr-0 ml-auto pt-16 pl-4'>
          {
            navLink.map((item, i) => {
              return (
                <Link key={i} href={item.to} className={`w-fit ${pathname == item.to ? "text-red-600" : ""} ${auth.user && (item.linkTitle == "signup") ? "hidden" : ''}`}
                  onClick={() => {
                    if (item.linkTitle == "logout") {
                      handelLogout()
                    }
                  }}
                >
                  {item.linkTitle}
                </Link>
              )
            })
          }
          {
            auth.user ?
              <div className='links group w-fit mt-1'>
                <h2 className='links flex items-center gap-1 cursor-pointer'>
                  <span className='links'><FaUserCircle className='links text-red-800 text-2xl inline' />{" "}
                    {auth?.user?.name?.slice(0, 6)}
                  </span>
                  <BsCaretDownFill className='links text-red-800 group-hover:rotate-180 transition-all duration-300' />
                </h2>
                <div className=' grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 z-50'>
                  <div className='overflow-hidden mt-2'>
                    <ul className='px-3 py-3 bg-gray-300 rounded w-fit' >
                      {profileDropDown.map((value, i) => {
                        return (
                          <Link key={i} href={value.to}
                            className='block'
                            onClick={() => {
                              if (value.linkTitle == "logout") {
                                handelLogout()
                              }
                            }}
                          >
                            {value.linkTitle}
                          </Link>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div> : <></>
          }

        </div>
      </div>

    </header>

  )
}

export default Header