import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedProducts from '../Component/RelatedProducts';

const Product = () => {
  const { productID } = useParams();
  const { products, currency , addToCart} = useContext(ShopContext);

  const [productData, setproductData] = useState(false)
  const [image, setimage] = useState("")
  const [size, setsize] = useState("")

  const fetchData = async () => {

    products.map(item => {
      if (item.id === Number(productID)) {
        setproductData(item)
        setimage(item.images[0])
        return null;
      }
    })
  }
  useEffect(() => {
    fetchData()
  }, [productID, products])



  return productData ? (
    <div className='borter-t-2 opacity-100 transition-opacity pt-10 ease-in duration-500'>
      {/* Product Data */}
      <div className='flex gap-12 flex-col sm:flex-row  '>
        {/* product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col sm:overflow-y-auto overflow-auto justify-between sm:justify-normal gap-3 sm:w-[18.7%] w-full'>
            {
              productData.images.map((item , index) => (
                <img key={index} onClick={() => setimage(item)} className='w-[24%] sm:w-full cursor-pointer flex-shrink-0' src={"http://localhost:5174"+item} alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='h-auto w-full' src={"http://localhost:5174"+image} alt="" />
          </div>
        </div>
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-3'> {productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_dull_icon} alt="" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-4 font-medium text-3xl'>{currency}{productData.price}</p>
          <p className=' text-gray-500 mt-4 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p >Select Size</p>
            <div className='flex  gap-2 '>
              {
                productData.sizes.map((item, index) => (
                  <button key={index} onClick={() => setsize(item)} className={`border border-gray-300 px-4 py-2 bg-gray-100 ${size === item ? "border-orange-700" : ""}`}>{item}</button>
                ))
              }
            </div>
          </div>
          <button onClick={() => addToCart(productData.id , size)} className='bg-black text-white px-8 py-3 active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-400 mt-5 flex flex-col'>
            <p>100% original product</p>
            <p>Cash on delivery is avalaible in this product</p>
            <p>Easy return and exchange policy wihtin 7 days</p>
          </div>
        </div>
      </div>
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-6 py-4 text-sm'>Descirption</b>
          <p className='border px-6 py-4 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col border gap-4 p-6 text-sm text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio tempora quis, quas facere dolorem amet necessitatibus aperiam tenetur vel fugiat, ratione repellendus magnam itaque aspernatur maxime unde quidem. Mollitia ex deserunt obcaecati eos possimus, modi id.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero unde beatae eos enim, voluptas voluptatum mollitia id qui vitae, odit vel velit. Iste assumenda praesentium repellendus cupiditate repudiandae sit excepturi, corrupti ducimus exercitationem architecto at cum non minima itaque.</p>
        </div>
      </div>
      <div>
        <RelatedProducts category={productData.category} subcategory={productData.subcategory}/>
      </div>
    </div>
  ) : <div> Loading Data.....</div>
}

export default Product