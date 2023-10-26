'use client'
import { useAuth } from '@/context/auth-provider'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const adminNavLink = [
    {
        linkTitle: "create category",
        to: "/dashboard/admin/create-category"
    },
    {
        linkTitle: "create product",
        to: "/dashboard/admin/create-product"
    },
    {
        linkTitle: "users",
        to: "/dashboard/admin/users"
    },

]
const userNavLink = [
    {
        linkTitle: "profile",
        to: "/dashboard/user/profile"
    },
    {
        linkTitle: "orders",
        to: "/dashboard/user/orders"
    },
]

const Header = () => {
    const pathname = usePathname()
    const [auth] = useAuth()
    return (
        <div className='flex flex-col gap-3 capitalize font-robo font-medium text-base w-full whitespace-nowrap'>
            <h1 className="text-center pt-3 font-rale font-semibold">{auth?.user?.role == 1 ? "Admin Panel" : "dashboard"}</h1>
            {
                (auth?.user?.role == 1 ? adminNavLink : userNavLink)?.map((value, i) => {
                    return (
                        <Link key={i} href={value.to} className={`py-1 px-4 border border-gray-500 rounded text-sm hover:bg-red-900 hover:text-white transition-colors duration-300 ${pathname == value.to ? "bg-red-900 text-white" : ""}`}>
                            {
                                value.linkTitle
                            }
                        </Link>
                    )
                })
            }

        </div>
    )
}

export default Header