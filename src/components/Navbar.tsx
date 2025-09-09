"use client"

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { link } from 'fs'
const Navbar = () => {
    const {data:session} = useSession()
    const user:User = session?.user
  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <a href="/" className="text-3xl font-bold mb-4 md:mb-0">Mystry Message</a>
      {
        session ? (
          <>
          <span className="mr-4 text-2xl">Welcome, {user?.username || user?.email}</span>
          <div className=' flex gap-x-4'>
             <Link href='/about'>
            <button className="w-full p-2 rounded-sm  md:w-auto bg-slate-100 text-black cursor-pointer" >About Us</button>
          </Link>
          <Link href='/dashboard'>
            <button className="w-full p-2 rounded-sm  md:w-auto bg-slate-100 text-black cursor-pointer" >Dashboard</button>
          </Link>
          <button onClick={()=> signOut()} className="w-full p-2 rounded-sm  md:w-auto bg-slate-100 text-black cursor-pointer" >Logout</button>
          </div>
          
          </>
        ):(
          
          <div className='flex gap-x-6'>
           <Link href='/about'>
            <button className="w-full p-2 rounded-sm  md:w-auto bg-slate-100 text-black cursor-pointer" >About Us</button>
          </Link>
          <Link href='/sign-in'>
            <button className="w-full p-2 rounded-sm  md:w-auto bg-slate-100 text-black cursor-pointer" >Login</button>
          </Link>
        
          </div>
          
        )
      }
    </div>
    </nav>
  )
}

export default Navbar
