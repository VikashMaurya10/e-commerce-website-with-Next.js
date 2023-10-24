import React from 'react'
import { SiMinutemailer } from "react-icons/si"
import { SlEarphonesAlt } from "react-icons/sl"
import { BiSolidPhoneCall } from "react-icons/bi"
import Image from 'next/image'
import img from "@/assets/contactUs.webp"

export const metadata = {
  title: "Ecommerce | Contact us",
  description: "contact us 27*7",
};


const Contact = () => {
  return (
    <section className='flex justify-center items-center h-[90vh]'>
      <div className='sm:w-[80%] w-[90%] mx-auto mb-8'>
        <div className='flex gap-4 justify-between sm:flex-row flex-col'>
          <div className='sm:w-1/2'> <Image src={img} className='object-contain h-full w-full' alt="contact us svg" /></div>
          <div className='sm:w-1/2 '>
            <h1 className='text-4xl font-rale font-semibold text-center'>Contact Us</h1>
            <div className='ml-4'>
              <p className="mt-3 lg:mb-8 mb-4 text-center sm:text-left">Any query and info about product feel free to call us.
                <span className='lg:block'>We are available 24<span>x</span>7.</span></p>
              <p><SiMinutemailer className='lg:text-3xl text-2xl text-red-700 inline' /> www.help@ecommerceapp.com</p>
              <p><BiSolidPhoneCall className='lg:text-3xl text-2xl text-red-700 inline mt-1' /> 012-3456789</p>
              <p><SlEarphonesAlt className='lg:text-2xl text-xl text-red-700 inline mr-1 mt-1' /> 1800-1800-123-00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact