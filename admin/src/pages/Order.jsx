import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../helper/baseUrl'
import { assets } from '../assets/assets.js'
import { toast } from 'react-toastify'

const Order = ({ token }) => {

  const currency = "$"

  const [orders, setorders] = useState([])
  const fetchAllOrders = () => {
    axios.post(baseUrl + "/api/order/list", {}, { headers: { token } })
      .then(result => {
        setorders(result.data.Orders)
      })
  }

  const statushandler = (e , id)=>{
    const status = e.target.value;

    axios.post(baseUrl +"/api/order/update" , {id , status} ,{ headers: { token } } )
    .then(result => {
      if (result.data.success) {
        fetchAllOrders();
        toast.success(result.data.message)
      }else{
        toast.error(result.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    if (token) {
      fetchAllOrders()
    }
  }, [token])
  useEffect(() => {
    console.log(orders)
  }, [orders])


  return (
    <div>

      {
        orders.map((order, index) => {

          return <div key={index} className=' gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' >
            <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr]'>
              <img className='w-12 ' src={assets.parcel_icon} alt="" />

              <div>
                {
                  order.items.map((item, index) => {
                    const isLastItem = index === order.items.length - 1;
                    return <p key={index} className='py-0.5'>{item.name} x {item.quantity} <span>{item.size}</span><span className={isLastItem ? "hidden" : ""}>,</span></p>

                  })
                }
                <div>
                <p className='mt-3 mb-2 font-medium'>{order.user_name}</p>
                <p>{order.address}</p>
                <p>{order.phone}</p>
              </div>
              </div>
              
              <div>
                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                <p className='mt-3'>Payment-Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? "Done" : "Pending"}</p>
                <p>Date : {order.formattedDate}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>Price : {currency}{order.price}</p>
              <div>
                <select onChange={(e) => statushandler(e , order.order_id)} value={order.status} className='p-2 font-semibold' >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>


            {/* <div>
              {
                order.items.map((item, index) => {
                   const isLastItem = index === order.items.length -1 ;
                    return <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr] lg:grid-cols-[1fr_2fr_1fr_1fr_1fr]'>
                      <img className='w-12 ' src={assets.parcel_icon} alt="" />
                      <div>
                        <p className='py-0.5'>{item.name} x {item.quantity} <span>{item.size}</span><span className={isLastItem ? "hidden" : ""}>,</span></p>
                        <p>{item.user_name}</p>
                        <p>{item.address}</p>
                        <p>{item.phone}</p>
                      </div>

                      <div>
                        <p>Items : {order.items.length}</p>
                        <p>Payment-Method : {item.paymentMethod}</p>
                        <p>Payment : {item.payment ? "Done" : "Pending"}</p>
                        <p>Date : {item.formattedDate}</p>
                      </div>
                      <p>Price : {currency}{item.price}</p>
                      <div>
                        <select >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Packing">Packing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for delivery">Out for delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>

                    </div>
                  

                })
              }
            </div> */}

          </div>
        })
      }
    </div>
  )
}

export default Order




