"use client"
import { useAuth } from '@/context/auth-provider'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const AdminDashboard = () => {
  const router = useRouter()
  const [auth] = useAuth()
  useEffect(() => {
    router.push(`/dashboard/${auth?.user?.role == 1 ? "admin/create-category" : "user/profile"}`)
  }, [router, auth])
  return (
    <>
    </>
  )
}

export default AdminDashboard