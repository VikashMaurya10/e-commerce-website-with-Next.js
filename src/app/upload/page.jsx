"use client"
import axios from 'axios'
import { parse } from 'postcss'
import React, { useEffect, useState } from 'react'




const Uplod = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios({
            url: '/api/product',
            method: 'get'
        }).then((res) => {
            console.log(res);
            setData(res)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    // console.log(JSON.parse(data))
    return (
        <div>
            {/* <img src={data.image.data} alt="" /> */}
        </div>
    )
}

export default Uplod