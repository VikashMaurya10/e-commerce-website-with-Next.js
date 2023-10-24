"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { CgMenuRightAlt, CgClose } from 'react-icons/cg'
import { FaShopify } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/auth-provider'
import { toast } from 'react-toastify'
import axios from 'axios'



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
      linkTitle: `${auth.user == null ? "login" : 'logout'}`,
      to: "/login"
    },
  ]

  const handelLogout = () => {
    setAuth({
      user: null,
    })

    axios({
      method: 'get',
      url: "/api/auth/logout"
    }).then((res) => {
      console.log(res);
      localStorage.clear("user")
      toast.success(res.data.message)
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <header className='text-black bg-gray-100 py-4 capitalize font-medium shadow-lg'>
      <nav className='flex items-center justify-between sm:max-w-[80%] max-w-[90%] mx-auto'>
        <Link href={"/"}><FaShopify className='text-5xl text-red-700' /></Link>
        {/* desktop nav */}
        <div className='hidden sm:flex gap-4'>
          {
            navLink.map((item, i) => {
              return (
                <Link key={i} href={item.to} className={`text-lg ${pathname == item.to ? "text-red-600" : ""} ${auth.user && (item.linkTitle == "signup") ? "hidden" : ''}`}
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
          if (e.target.id != "links") {
            setShowMenu(!showMenu)
          }
        }}
      >
        <div id='links' className='bg-gray-200 h-screen flex flex-col gap-1 text-base w-[70%] mr-0 ml-auto pt-16 pl-4'>
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
        </div>
      </div>

    </header>

  )
}

export default Header