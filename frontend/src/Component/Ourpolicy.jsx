import React from 'react'
import { assets } from '../assets/assets'

const Ourpolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around text-center  py-20 gap-12 sm:gap-2 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img className='m-auto mb-5 w-16' src={assets.exchange_icon} alt="" />
            <p className='font-semi-bold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>We provide hassle free exhange policy</p>
        </div>
        <div>
            <img className='m-auto mb-5 w-16' src={assets.quality_icon} alt="" />
            <p className='font-semi-bold'>7 Days return policy</p>
            <p className='text-gray-400'>We provide 7 days free return policy</p>
        </div>
        <div>
            <img className='m-auto mb-5 w-16' src={assets.support_img} alt="" />
            <p className='font-semi-bold'>Best Customer Support</p>
            <p className='text-gray-400'>We provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default Ourpolicy