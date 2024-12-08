import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { baseUrl } from '../../helper/baseUrl'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setimage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [image4, setimage4] = useState(false);

  const [name, setname] = useState("")
  const [description, setdescription] = useState("")
  const [price, setprice] = useState("")
  const [category, setcategory] = useState("Men")
  const [subcategory, setsubcategory] = useState("Topwear")
  const [bestseller, setbestseller] = useState(false)
  const [sizes, setsizes] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("bestseller", bestseller);
    formData.append("sizes", JSON.stringify(sizes));


    const images = [image1, image2, image3, image4].filter(Boolean);
    images.forEach((image, index) => {
      formData.append(`images`, image); // Use the same field name `images` for all
    });



    axios.post(baseUrl + "/api/product/add", formData, { headers: { token } })
      .then(result => {
        if (result.data.success) {
          toast.success(result.data.message)
          setname("")
          setdescription("")
          setprice("")
          setimage1(false)
          setimage2(false)
          setimage3(false)
          setimage4(false)
        } else {
          toast.error(result.data.message)
        }
      }).catch(err => {
          toast.error(err.message)
      })

  }

  return (
    <div>
      <form className='flex flex-col w-full items-start gap-3' onSubmit={handleSubmit}>
        <div >
          <p className='mb-2'>Upload Image</p>
          <div className='gap-2 flex '>
            <label htmlFor="image1">
              <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
              <input onChange={(e) => setimage1(e.target.files[0])} type="file" id='image1' hidden />
            </label>
            <label htmlFor="image2">
              <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
              <input onChange={(e) => setimage2(e.target.files[0])} type="file" id='image2' hidden />
            </label>
            <label htmlFor="image3">
              <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
              <input onChange={(e) => setimage3(e.target.files[0])} type="file" id='image3' hidden />
            </label>
            <label htmlFor="image4">
              <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
              <input onChange={(e) => setimage4(e.target.files[0])} type="file" id='image4' hidden />
            </label>
          </div>
          <div></div>
        </div>
        <div className='w-full'>
          <p>Product name</p>
          <input onChange={(e) => setname(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Enter product name' required />
        </div>
        <div className='w-full'>
          <p>Product description</p>
          <textarea onChange={(e) => setdescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' placeholder='Write Content here' required></textarea>
        </div>
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
          <div>
            <p className='mb-2'>Product Category</p>
            <select required onChange={(e) => setcategory(e.target.value)} className='w-full px-3 py-2'>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <p required className='mb-2'>Product Sub Category</p>
            <select onChange={(e) => setsubcategory(e.target.value)} className='w-full px-3 py-2'>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div >
            <p className='mb-2'>Price</p>
            <input required onChange={(e) => setprice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='25' />
          </div>
        </div>
        <div >
          <p className='mb-2'>Product Sizes</p>
          <div className='flex gap-2'>
            <div onClick={() => setsizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])} className={`cursor-pointer ${sizes.includes("S") ? "bg-gray-400" : "bg-slate-200"} px-3 py-1`}>S</div>
            <div onClick={() => setsizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])} className={`cursor-pointer ${sizes.includes("M") ? "bg-gray-400" : "bg-slate-200"} px-3 py-1`}>M</div>
            <div onClick={() => setsizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])} className={`cursor-pointer ${sizes.includes("L") ? "bg-gray-400" : "bg-slate-200"} px-3 py-1`}>L</div>
            <div onClick={() => setsizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])} className={`cursor-pointer ${sizes.includes("XL") ? "bg-gray-400" : "bg-slate-200"} px-3 py-1`}>XL</div>
            <div onClick={() => setsizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])} className={`cursor-pointer ${sizes.includes("XXL") ? "bg-gray-400" : "bg-slate-200"} px-3 py-1`}>XXL</div>
          </div>
        </div>
        <div className='flex mt-2 gap-2'>
          <input type="checkbox" onChange={() => setbestseller(prev => !prev)} checked={bestseller} id='bestseller' />
          <label htmlFor="bestseller" className='cursor-pointer'>Add to bestseller</label>
        </div>
        <button className='bg-black text-white px-4 py-3 w-28'>ADD</button>
      </form>
    </div>
  )
}

export default Add