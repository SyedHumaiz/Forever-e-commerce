import React from 'react'
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets'
const Sidebar = () => {

  return (
    <div className='w-[18%] border-r-2 min-h-screen'>
      <div className='flex flex-col gap-4 pl-[20%] pt-6 text-[15px]'>
        <NavLink to='/add' className='flex items-center border-gray-300 border border-r-0 px-4 py-3 gap-4 rounded-sm '>
          <img className='w-5 h-5' src={assets.add_icon}  alt="" />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>
        <NavLink to='/list' className='flex items-center border-gray-300 border border-r-0 px-4 py-3 gap-4 rounded-sm '>
          <img className='w-5 h-5' src={assets.order_icon} alt="" />
          <p className='hidden md:block'>List Items</p>
        </NavLink>
        <NavLink to='/order' className='flex items-center border-gray-300 border border-r-0 px-4 py-3 gap-4 rounded-sm '>
          <img className='w-5 h-5' src={assets.order_icon} alt="" />
          <p className='hidden md:block'>Order Items</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar