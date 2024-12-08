import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';



const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestproducts, setlatestproducts] = useState([])
  useEffect(() => {
      setlatestproducts(products.slice(0, 10));
    
  }, [products])

  return (
    <div className='my-10'>
      <div className='text-3xl py-8 text-center'>
        <Title text1={"Latest"} text2={"Collection"} />
        <p className='w-3/4 m-auto text-xs sm:text-medium md:text-base text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam sunt eveniet sed voluptate animi iusto, deserunt optio expedita.</p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestproducts.map((items ,index) => {
            return (
              <ProductItem key={index} id={items.id} images={items.images} name={items.name} price={items.price} />
            )
          })
        }
      </div>

    </div>
  )
}
export default LatestCollection