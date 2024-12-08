import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const [Visible, setVisible] = useState(false)
    const { setShowSearch, getCartCount, token, settoken, navigate, serCartItems } = useContext(ShopContext);
    const logout = () => {
        navigate("/login");
        localStorage.removeItem("token");
        settoken("");
        serCartItems({});
    }

    return (
        <div className='py-[2vw] flex items-center justify-between font-medium'>
            <Link to='/'><img src={assets.logo} className='w-36' alt="" />
            </Link>
            <ul className='hidden sm:flex text-sm gap-5 text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1 uppercase' >
                    <p>Home</p>
                    <hr className='w-2/4 bg-gray-900 border-none h-[1.5px] hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1 uppercase'>
                    <p>Collection</p>
                    <hr className='w-2/4 bg-gray-900 border-none h-[1.5px] hidden' />
                </NavLink>
                <NavLink to='about' className='flex flex-col items-center gap-1 uppercase'>
                    <p>About</p>
                    <hr className='w-2/4 bg-gray-900 border-none h-[1.5px] hidden' />
                </NavLink >
                <NavLink to='contact' className='flex flex-col items-center gap-1 uppercase '>
                    <p>Contact</p>
                    <hr className='w-2/4 bg-gray-900 border-none h-[1.5px] hidden' />
                </NavLink>
            </ul>

            <div className='flex gap-6 items-center'>
                <img className='w-5 cursor-pointer'
                    onClick={() => setShowSearch(true)}
                    src={assets.search_icon} alt="" />

                <div className='group relative'>
                    <img onClick={() => token ? null : navigate("/login")} className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
                    {token &&
                        <div className='hidden absolute group-hover:block dropdown-menu left-[-75%] pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-1 px-5 bg-slate-100 text-gray-500'>
                                <p className='cursor-pointer hover:text-black'>My profile</p>
                                <p onClick={() => navigate("/orders")} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={() => logout()} className='cursor-pointer hover:text-black'>LogOut</p>
                            </div>
                        </div>}
                </div>
                <div onClick={() => token ? navigate("/cart") : navigate("/login")} className='relative'>
                    <img className=' w-5 cursor-pointer' src={assets.cart_icon} alt="" />
                    <p className='absolute leading-4 right-[-5px] bottom-[-5px] bg-black text-white aspect-square rounded-full text-[8px] w-4 text-center'>{getCartCount()}</p>
                </div>


                <img onClick={() => setVisible(true)} className='sm:hidden flex w-6 cursor-pointer' src={assets.menu_icon} alt="" />
                <div className={`right-0 bottom-0 top-0 absolute bg-white translate-all overflow-hidden ${Visible ? `w-full` : `w-0`}`}>
                    <div className='flex flex-col'>
                        <div onClick={() => setVisible(false)} className='px-[3vw] py-[2vw] cursor-pointer flex items-center gap-3 text-medium'>
                            <img className='rotate-180 h-4 ' src={assets.dropdown_icon} alt="" />
                            <p>BACK</p>
                        </div>
                        <NavLink onClick={() => setVisible(false)} className='border pl-6 py-3' to='/' >Home</NavLink>
                        <NavLink onClick={() => setVisible(false)} className='border pl-6 py-3' to='/collection' >Collection</NavLink>
                        <NavLink onClick={() => setVisible(false)} className='border pl-6 py-3' to='/about' >About</NavLink>
                        <NavLink onClick={() => setVisible(false)} className='border pl-6 py-3' to='/contact' >Contact</NavLink>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar