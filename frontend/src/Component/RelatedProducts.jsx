import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category , subcategory}) => {
    const { products } = useContext(ShopContext);
    const [related, setrelated] = useState([])

    useEffect(() => {
        let productsCopy = products.slice();
        
        productsCopy = productsCopy.filter( item => category === item.category )
        productsCopy = productsCopy.filter( item => subcategory === item.subcategory )
        setrelated(productsCopy.slice(0,5))
    }, [products])

    return (
        <div className='my-24'>
            <div className='text-2xl text-center py-2'>
                <Title text1={"Related"} text2={"Products"} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-4'>
                {
                    related.map( (item , index) => (
                        <ProductItem key={index} id={item.id} name={item.name} price={item.price} images={item.images}/>
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProducts