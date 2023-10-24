"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navLink = [
  {
    linkTitle: "about",
    to: "/about"
  },
  {
    linkTitle: "contact",
    to: "/contact"
  },
  {
    linkTitle: "policy",
    to: "/policy"
  },
]
const Footer = () => {
  const pathname = usePathname()
  return (
    <footer className='bg-gray-900 py-10 text-white capitalize'>
      <h1 className='text-center'>All right reserved &copy; vikashTech. </h1>
      <div className='flex gap-4 items-center justify-center '>
        {
          navLink.map((item, i) => {
            return (
              <Link key={i} href={item.to} className={`text-base ${pathname == item.to ? "text-red-600" : ""}`}

              >{item.linkTitle}</Link>
            )
          })
        }
      </div>
    </footer>
  )
}

export default Footer