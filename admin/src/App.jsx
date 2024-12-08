import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './Components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [token, settoken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "")

  useEffect(() => {
    localStorage.setItem("token" , token)
    console.log(token)
  }, [token])
  

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
     {
      token === "" ? <Login settoken = {settoken} />
      :  <>
      <Navbar settoken = {settoken} />
      <hr />
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-[70%] mx-auto my-8 ml-[max(5vw,25px)] text-gray-600 text-base'>
          <Routes>
            <Route path='/add' element={<Add token = {token}/>}></Route>
            <Route path='/list' element={<List token = {token}/>}></Route>
            <Route path='/order' element={<Order token = {token}/>}></Route>
          </Routes>

        </div>
      </div>
    </>
     }
    </div>
  )
}

export default App