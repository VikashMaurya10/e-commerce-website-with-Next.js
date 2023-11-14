'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import { EditIcon } from "@/assets"
import { CategoryFrom } from "@/components"
import { toast } from "react-toastify"

const CreateCategory = () => {
  const [category, setCategory] = useState([])
  const [categoryName, setCategoryName] = useState("")

  // get category
  const getCategory = async () => [
    await axios({
      method: 'get',
      url: "/api/category"
    }).then((res) => {
      console.log(res.data);
      setCategory(res.data.categories)
    }).catch((err) => {
      console.log(err);
    })
  ]
  // create category
  const addNewCategory = async () => {
    await axios({
      method: "post",
      url: "/api/category/create-category",
      data: { name: categoryName }
    }).then((res) => {
      if (res?.data?.error) {
        return toast.error(res?.data?.error)
      }
      setCategoryName("")
      getCategory()
      return toast.success(res?.data?.message)
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getCategory()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    addNewCategory()
  }
  // console.log(category);
  return (
    <div className="">
      <h1 className=" text-lg lg:text-xl font-bold font-rale text-red-800 text-center">Manage Category</h1>
      <div className="mt-8">
        <CategoryFrom
          _this={{
            handleSubmit,
            categoryName,
            setCategoryName
          }}
        />
      </div>
      <table className="w-full mt-8">
        <thead className=" text-left capitalize">
          <tr>
            <th>Name</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {
            category.map((value) => {
              return (
                <tr key={value._id} className="even:bg-gray-300 rounded-xl">
                  <td className="px-2 py-1 mt-4">{value.name}</td>
                  <td className="px-2 py-1">
                    <button className="grid place-items-center"><EditIcon className="text-red-800 text-xl" /></button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default CreateCategory