import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] text-sm gap-14 mt-40 my-10'>
                <div>
                    <img className='w-32 mb-5' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo deleniti consequuntur facere excepturi pariatur, aut quibusdam. Voluptates aspernatur delectus aliquam. Culpa repellendus tenetur dolor doloremque dolorem.</p>
                </div>
                <div>
                    <p className='text-xl mb-5 font-medium'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl mb-5 font-medium'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+1-212-456-789</li>
                        <li>contact@forever.com</li>
                    </ul>
                </div>

            </div>
            <div >
                <hr />
                <p className='text-sm text-gray-800 text-center py-5 '>Copyright 2024@ forever.com - All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer