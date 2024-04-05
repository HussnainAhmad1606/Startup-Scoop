import React from 'react'
import { toast } from 'react-hot-toast'
function Newsletter() {
    const subscribe = () => {
        toast.success('Successfully toasted!',{
            style: {
               backgroundColor: "#0A0A0A",
               color: "white"
              }
        })
    }
  return (
    <div className="flex h-screen items-center justify-center bg-[#fbfbfb]">
      <div className="grid w-80 grid-rows-4 gap-1">
        <p className="font-semibold text-gray-700">💌 Get the daily news directly to your email.</p>
        <input type="text" className="h-10 w-full rounded border p-2 text-sm" placeholder="Your email" />
        <button onClick={subscribe} className="rounded bg-[#FD5E57] text-gray-50 hover:bg-gradient-to-r hover:from-[#FD5E57] hover:to-[#FC477E]">Subscribe to the newsletter</button>
       
      </div>
    </div>
  )
}

export default Newsletter