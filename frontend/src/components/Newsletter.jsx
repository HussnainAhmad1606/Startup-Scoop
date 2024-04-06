import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom';
function Newsletter() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
    const subscribe = async() => {
      if (email=="" || name == "") {
        toast.error("Both name and email are required",{
          style: {
            backgroundColor: "#0A0A0A",
            color: "white"
          }
        })
        return;
      }
      const data = {
        email: email,
        name: name
      }
      const request = await fetch("http://localhost:3000/subscribe", {
        
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const response = await request.json();
      if (response.type == "success") {

        toast.success(response.message,{
          style: {
            backgroundColor: "#0A0A0A",
            color: "white"
          }
        })
      }
      else {
        toast.error(response.message,{
          style: {
            backgroundColor: "#0A0A0A",
            color: "white"
          }
        })
      }
    }
  return (
    <>
    
    <div className="flex flex-col h-screen items-center justify-center ">
    <h1 className="my-10 text-3xl font-bold">
      Startup Scoop
    </h1>
      <div className="grid w-80 grid-rows-4 gap-1">
        <p className="font-semibold text-gray-700">💌 Get the daily news directly to your email.</p>
        <input value={name} onChange={e=>setName(e.target.value)} type="text" className="h-10 w-full rounded border p-2 text-sm" placeholder="Your name" />
        <input value={email} onChange={e=>setEmail(e.target.value)} type="text" className="h-10 w-full rounded border p-2 text-sm" placeholder="Your email" />
        <button onClick={subscribe} className="rounded bg-[#FD5E57] text-gray-50 hover:bg-gradient-to-r hover:from-[#FD5E57] hover:to-[#FC477E]">Subscribe to the newsletter</button>
        <Link to={'/news'}>
      <p class="mt-4 flex items-center text-xs text-gray-500 hover:text-gray-700">
        Read the latest news
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-1 h-3 w-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </p>
    </Link>
      </div>
    </div>
    </>
  )
}

export default Newsletter