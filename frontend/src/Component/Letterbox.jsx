import React from 'react'

const Letterbox = () => {

    const handleSubmit = (e)=> {
        e.preventDefault();
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe to get 20% off</p>
        <p className='text-gray-400 mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur praesentium quod ea velit incidunt, cumque quos!</p>

        <form onSubmit={handleSubmit} className='w-full sm:w-1/2 flex items-center mx-auto  gap-3 my-8 border' >
            <input required className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter Your Email' />
            <button type='submit' className='bg-black text-white text-sm py-4 px-10'>Subscribe</button>
        </form>
    </div>
  )
}

export default Letterbox