import React, { useState } from 'react'
import axios from 'axios'
import {baseUrl} from '../../helper/baseUrl'
import { toast } from 'react-toastify'

const Login = ({settoken}) => {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const handleSubmit = (e)=> {
    e.preventDefault();
    axios.post(baseUrl+"/api/user/adminlogin" , {email , password} )
    .then(result => {
      if(result.data.success){
        settoken(result.data.token)
      }
      else{
        toast.error(result.data.message)
      }
    }).catch(err => {
      toast.error(err.message)
    })
  }

  return (

    <div className='min-h-screen w-full flex items-center justify-center'>
      <div className='bg-white drop-shadow-md max-w-md rounded-lg px-8 py-6'>
        <h1 className='text-2xl font-bold mb-4'> ADMIN PANEL </h1>
          <form onSubmit={handleSubmit}>
            <div className='mb-3 min-w-72'>
              <p className='text-sm font-medium text-gray-700 mb-2'>Enter Email</p>
              <input onChange={(e)=> setemail(e.target.value)} className='w-full rounded-md border border-gray-300 px-3 py-2' type="text" placeholder='@email.com' required />
            </div>
            <div className='mb-3 min-w-72'>
              <p className='text-sm font-medium text-gray-700 mb-2'>Enter Password</p>
              <input onChange={(e)=> setpassword(e.target.value)} className='w-full rounded-md border border-gray-300 px-3 py-2' type="password" placeholder='Enter your password' required />
            </div>
            <button className='w-full bg-black text-white py-2 rounded-md'>Login</button>
          </form>
        
      </div>
    </div>
  )
}

export default Login