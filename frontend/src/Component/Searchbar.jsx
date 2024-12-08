import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const Searchbar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setvisible] = useState(false)
    const Location = useLocation();

    useEffect(() => {
        if (Location.pathname.includes("collection")) {
            setvisible(true)
        }
        else{
            setvisible(false)
        }
    }, [Location])


    return showSearch && visible ? (
        <div className='flex justify-center items-center border-t  border-gray-200 text center'>
            <div className='inline-flex justify-center items-center border border-gray-400 px-5 py-2 rounded-full mx-3 my-5 w-3/4 sm:w-1/2'>
                <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1  outline-none bg-inherit text-sm' type="text" />
                <img className='w-4 cursor-pointer' src={assets.search_icon} />
            </div>
            <img onClick={() => setShowSearch(false)} className='h-4 cursor-pointer' src={assets.cross_icon} alt="" />
        </div>
    ) : null
}

export default Searchbar