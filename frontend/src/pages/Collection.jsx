import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from "../Component/Title"
import ProductItem from '../Component/ProductItem'

const Collection = () => {

  const { products, showSearch, search } = useContext(ShopContext)

  const [showFilter, setshowFilter] = useState(false)
  const [filterProduct, setfilterProduct] = useState([])
  const [category, setcategory] = useState([])
  const [subcategory, setsubcategory] = useState([])
  const [sortType, setsortType] = useState('relavent')


  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setcategory(category => category.filter(item => item !== e.target.value))
    }
    else {
      setcategory([...category, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setsubcategory(subcategory => subcategory.filter(item => item !== e.target.value))
    }
    else {
      setsubcategory([...subcategory, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter(item => subcategory.includes(item.subcategory))
    }
    setfilterProduct(productsCopy);
  }

  const sortFilter = () => {
    let fpcopy = filterProduct.slice()

    switch (sortType) {
      case 'low-high':
        setfilterProduct(fpcopy.sort((a, b) => a.price - b.price))
        break;
      case 'high-low':
        setfilterProduct(fpcopy.sort((a, b) => b.price - a.price))
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(() => {
    applyFilter()
  }, [category, subcategory , search , showSearch , products])

  useEffect(() => {
    sortFilter();
  }, [sortType])


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200'>
      {/* left side */}
      <div className='min-w-60'>
        <p onClick={() => setshowFilter(!showFilter)} className='text-xl flex items-center my-2 cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* for categories */}
        <div className={`border pl-5 py-3 border-gray-300 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 font-medium text-sm'>CATEGORIES</p>
          <div className='text-xs flex flex-col gap-2 font-light text-gray-700'>
            <p className='flex gap-2'>
              <input onChange={toggleCategory} className='w-3' type="checkbox" value={"Men"} />MEN
            </p>
            <p className='flex gap-2'>
              <input onChange={toggleCategory} className='w-3' type="checkbox" value={'Women'} />WOMEN
            </p>
            <p className='flex gap-2'>
              <input onChange={toggleCategory} className='w-3' type="checkbox" value={'Kids'} />KIDS
            </p>
          </div>
        </div>
        {/* for subcategory */}
        <div className={`border pl-5 py-3 border-gray-300 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 font-medium text-sm'>TYPE</p>
          <div className='text-xs flex flex-col gap-2 font-light text-gray-700'>
            <p className='flex gap-2'>
              <input onChange={toggleSubCategory} className='w-3' type="checkbox" value={"Topwear"} />TOP
            </p>
            <p className='flex gap-2'>
              <input onChange={toggleSubCategory} className='w-3' type="checkbox" value={'Bottomwear'} />BOTTOM
            </p>
            <p className='flex gap-2'>
              <input onChange={toggleSubCategory} className='w-3' type="checkbox" value={'Winterwear'} />WINTERWEAR
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className='flex-1'>
        <div className='flex justify-between mb-4 text-base sm:text-2xl'>
          <Title text1={'All'} text2={'COLLECTION'} />
          <select onChange={(e) => setsortType(e.target.value)} className='border-2 border-gray-400 text-base px-2' >
            <option value="relavent">Relavent</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            filterProduct.map((item, index) => {
              return (
                <ProductItem key={index} id={item.id} name={item.name} images={item.images} price={item.price} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Collection