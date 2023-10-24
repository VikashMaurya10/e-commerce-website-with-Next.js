import Link from 'next/link'
import React from 'react'

const PageNotFound = () => {
    return (
        <section className='flex flex-col justify-center items-center min-h-[80vh]'>
            <h1 className='text-9xl capitalize font-bold'>4<span className='text-red-600'>0</span>4</h1>
            <h2 className='text-4xl capitalize mt-4'>Oops! Page not Found</h2>
            <Link href={"/"} className='px-4 p-2 capitalize font-inter font-semibold bg-red-800 text-white rounded hover:bg-red-700 transition-colors duration-300 mt-4'>Go to home </Link>
        </section>
    )
}

export default PageNotFound