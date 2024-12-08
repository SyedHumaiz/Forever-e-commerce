import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../../helper/baseUrl'

const List = ({ token }) => {

  const [list, setlist] = useState([])
  const currency = "$"
  const fetchList = () => {

    axios.get(baseUrl + "/api/product/listproducts" )
      .then(result => {
        if (result.data.success) {
          console.log(result.data.Products)
          setlist(result.data.Products)
        }
        else {
          toast.error(result.data.message)
        }
      }).catch(
        err => toast.error(err.message)
      )

  }

  const removeProduct = (id) => {
    axios.post(baseUrl + "/api/product/remove", { id }, { headers: { token } })
      .then(result => {
        if (result.data.success) {
          toast.success(result.data.message)
          fetchList()
        }
        else {
          toast.error(result.data.message)
        }
      }).catch(err => {
        toast.error(err.message)
      })
  }

  const confirmDelete = (id, handleDelete) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this data?</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              handleDelete(id);
              toast.dismiss(); // Close the toast after confirmation
            }}>  Yes  </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => toast.dismiss()} // Close the toast without action
          >No</button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: false, // Prevent auto-closing
        closeOnClick: false, // Disable close on click
      }
    );
  };

  useEffect(() => {
    fetchList();
  }, [])

  


  return (
    <>
      <p className='mb-2'>All Product List</p>
      <div>
        {/* List Title */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2  border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* product list */}

        {
          list.length === 0 ? (
            <p>No products found.</p>
          ) : (
            list.map((item, index) => (
              <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 border text-sm px-2 py-1' key={index}>
                <img className='w-20' src={item.images[0]} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{currency}{item.price}</p>
                <p onClick={() => confirmDelete(item.id , removeProduct)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
              </div>
            ))
          )
        }

      </div>
    </>
  )
}

export default List