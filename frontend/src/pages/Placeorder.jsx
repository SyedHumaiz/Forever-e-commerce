import React, { useContext, useEffect, useState } from 'react'
import Title from '../Component/Title'
import CartTotal from '../Component/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Placeorder = () => {


  const {navigate ,baseUrl , token , cartItems , getCartAmount , deliveryfee , products , setcartItems} = useContext(ShopContext)
  const [method, setmethod] = useState('cod')

  const [formData, setformData] = useState({
    firstName: "",
    lastName : "",
    email : "",
    street : "" ,
    city : "",
    state : "",
    zipCode : "",
    country : "" ,
    phone : "" ,
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    let value = e.target.value
    if (name === "zipCode" || name === "phone") {
      value = value.replace(/\D/, ""); 
    }
    setformData(data => ({...data , [name] : value}))
  }

  const handleMethod = (selectedMethod) => {
    if (selectedMethod == "stripe" || selectedMethod === "razorpay") {
      toast.error("This payment method is not available in your region.")
      setTimeout(() => {
        setmethod("cod")
      }, 2000);
    }else{
      setmethod(selectedMethod)
    }
  }

  const submitHandler = (e)=> {
    e.preventDefault();
   
    const orderItems = Object.keys(cartItems).map(product_id => {
      const sizes = Object.keys(cartItems[product_id]).map(size => ({
        size : size,
        quantity : cartItems[product_id][size]
      }));
      return {
        product_id : parseInt(product_id),
        sizes : sizes
      }
    })
    const address = `${formData.street}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}. `
    const amount = getCartAmount() + deliveryfee
    const paymentMethod = method;
    const name = formData.firstName +" " + formData.lastName;
    const email = formData.email;
    const phone = formData.phone;

    switch(method){
      case  "cod":
        axios.post(baseUrl + "/api/order/placeOrder" , {orderItems, amount, address, paymentMethod , name , email , phone} , {headers : {token}})
        .then(result => {
          if(result.data.success){
            setcartItems({})
            navigate("/orders")
          }else{
            console.log(result.data.message)
          }
        }).catch(err => {
          console.log(err.message)
        })

        break;
      default:
        break;
    }

  }

  return (
    <form onSubmit={submitHandler} className='flex flex-col sm:flex-row justify-between pt-5 sm:pt-14 gap-4 min-h-[80vh] border-t'>
      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:w-[30%]'>
        <div className='text-2xl'>
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} value={formData.firstName} name='firstName' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} value={formData.lastName} name='lastName'  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} value={formData.email} name='email'  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
        <input required  onChange={onChangeHandler} value={formData.street} name='street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} value={formData.city} name='city'  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} value={formData.state} name='state'  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required  onChange={onChangeHandler} value={formData.zipCode} name='zipCode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
          <input required  onChange={onChangeHandler} value={formData.country} name='country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
          <input  onChange={onChangeHandler} value={formData.phone} name='phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
      </div>
      {/* right side */}
      <div className='mt-8'>
        <div className='min-w-80'>
          <CartTotal/>
        </div>
        <div className='mt-8'>
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className='flex flex-col lg:flex-row  gap-3'>
            <div onClick={()=> handleMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full ${method === "stripe"? "bg-green-500" : ""}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=> handleMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full ${method === "razorpay"? "bg-green-500" : ""}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={()=> handleMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full ${method === "cod" ? "bg-green-500" : ""}`}></p>
              <p>CASH ON DELIVERY</p>
            </div>
          </div>
        </div>
        <div className='w-full text-end mt-8'>
          <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default Placeorder