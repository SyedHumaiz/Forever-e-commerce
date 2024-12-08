import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState, setcurrentState] = useState("Login")
  const { token, settoken, baseUrl, navigate } = useContext(ShopContext);
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const submitHandler = (e) => {
    e.preventDefault();
    if (currentState === "Sign Up") {
      axios.post(baseUrl + "/api/user/register", { name, email, password })
        .then((result) => {
          toast.success(result.data.message)
          settoken(result.data.token)
          localStorage.setItem("token" , result.data.token)
        }).catch((err) => {
          toast.error(err.message)
        });
    }
    else {
      axios.post(baseUrl + "/api/user/login", { email, password })
        .then((result) => {
          toast.success(result.data.message)
          settoken(result.data.token)
          localStorage.setItem("token" , result.data.token)
        }).catch((err) => {
          toast.error(err.message)
        });
    }

  }

  useEffect(() =>{
    if (token) {
      navigate("/")
    }
  }, [token])
  
  
  return (
    <form onSubmit={submitHandler} className='flex flex-col w-[90%] sm:max-w-96 items-center m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl prata-regular'>{currentState}</p>
        <hr className='w-8 h-[1.5px] border-none bg-gray-800' />
      </div>
      {currentState === "Sign Up" ? <input onChange={(e) => setname(e.target.value)} className='px-3 py-2 w-full border border-gray-800 rounded-sm' type="text" placeholder='Name' required /> : ""}
      <input onChange={(e) => setemail(e.target.value)} className='px-3 py-2 w-full border border-gray-800 rounded-sm' type="Email" placeholder='Email' required />
      <input onChange={(e) => setpassword(e.target.value)} className='px-3 py-2 w-full border border-gray-800 rounded-sm' type="Password" placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {
          currentState === "Login"
            ? <div className='w-full flex justify-between'>
              <p onClick={() => setcurrentState("Sign Up")} className='cursor-pointer'>Create account</p>
              <p className='cursor-pointer'>Forgot Password?</p>
            </div>

            : <p onClick={() => setcurrentState("Login")} className='cursor-pointer'>Login here</p>
        }
      </div>
      <button className='bg-black text-white px-6 py-2 mt-2 font-light'>{currentState === "Login" ? "Sign In" : "Sign Up"}</button>
    </form>
  )
}

export default Login