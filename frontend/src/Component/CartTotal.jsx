import React, { useContext, useEffect } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
         const {currency ,getCartAmount ,deliveryfee} = useContext(ShopContext);

         
  return (
    <div className='w-full mt-11'>
        <div className='text-2xl'>
            <Title text1={"Cart"} text2={"Total"}/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
            <p>SubTotal</p>
            <p>{currency} {getCartAmount()}.00</p>
        </div>
            <hr />
        <div className='flex justify-between'>
            <p>Shipping Fee</p>
            <p>{currency} {deliveryfee}.00</p>
        </div>
            <hr  />
        <div className='flex justify-between font-medium'>
            <p>Total Amount</p>
            <p>{currency} {getCartAmount() === 0 ? 0 : getCartAmount()  + deliveryfee}.00</p>
        </div>
        </div>
    </div>
  )
}

export default CartTotal