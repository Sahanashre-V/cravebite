"use client"
import { useState } from "react"
import axios from "axios"

export default function AiIntegrate() {
    const [req,setReq] = useState("")
    const [res,setRes] = useState("")

    const handleClick = async() => {
        try{
        const response = await axios.post('/api/gemini',{req})
        console.log(response)
        setRes(response.data.message)
        }
        catch(err){
            console.log("Error in fetching details",err)
        }
    }

    return(
        <div>
            <input onChange={(e)=>setReq(e.target.value)} placeholder="Enter Ingredients"/>
            <button onClick={handleClick}>Enter</button>
            <p>{res}</p>
        </div>
    )
}