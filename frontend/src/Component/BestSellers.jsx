import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSellers = () => {
    const {products} = useContext(ShopContext)

    const [BestSellers, setBestSellers] = useState([])
    useEffect(() => {
      const bestProducts = products.filter((item) => item.bestseller)
      setBestSellers(bestProducts.slice(0,5))
    }, [products])
    
  return (
    <div className='my-10'>
        <div className='text-3xl text-center py-8'>
            <Title text1={"Best"} text2={"Seller"} />
            <p className='w-3/4 m-auto text-xs sm:text-medium md:text-base text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam sunt eveniet sed voluptate animi iusto, deserunt optio expedita.</p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                BestSellers.map((item , index)=>{
                    return <ProductItem key={index} id={item.id} name={item.name} price={item.price} images={item.images} />
                })
            }
        </div>
    </div>
  )
}

export default BestSellers