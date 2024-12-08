import React from 'react'
import Title from '../Component/Title'
import Letterbox from '../Component/Letterbox'
import {assets} from "../assets/assets"
const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"About"} text2={"Us"} />
      </div>
      <div className='flex flex-col md:flex-row my-10 gap-16'>
        <img className='w-full md:w-[30%]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center md:w-2/4 gap-6 text-gray-600'>
          <p >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam illo cum sint fuga non. Ullam, modi dolores? In, hic dolorem! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam non doloremque sed perspiciatis quas minus modi ab et corporis officiis.</p>
          <p >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam illo cum sint fuga non. Ullam, modi dolores? In, hic dolorem! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam non doloremque sed perspiciatis quas minus modi ab et corporis officiis.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe quam eum iste quos quo mollitia eaque consectetur atque dolores quis.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"} />
        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo et laborum beatae recusandae labore, velit facere quibusdam sequi enim quaerat iusto at.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo et laborum beatae recusandae labore, velit facere quibusdam sequi enim quaerat iusto at.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo et laborum beatae recusandae labore, velit facere quibusdam sequi enim quaerat iusto at.</p>
          </div>
        </div>
      </div>
      <Letterbox />
    </div>
  )
}

export default About