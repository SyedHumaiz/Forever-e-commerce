import React from 'react'

const Title = ({text1 , text2}) => {
  return (
    <div className='inline-flex items-center gap-2 mb-3 '>
        <div className='text-gray-500'>{text1} <span className='font-medium text-gray-700'>{text2}</span></div>
        <div className='w-8 sm:w-11 h-[1px] sm:h-[2px] bg-[#414141]'></div>
    </div>
  )
}

export default Title