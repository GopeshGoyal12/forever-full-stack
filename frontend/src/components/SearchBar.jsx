import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible,setVisible] = useState(false)
    const location = useLocation();

    useEffect(()=>{
        if (location.pathname.includes('collection')) {
            setVisible(true);
        }
        else {
            setVisible(false)
        }
    },[location])
    
  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50/90 text-center px-4 py-3 sm:py-4'>
      <div className='inline-flex items-center justify-between border border-gray-400 px-4 py-2 rounded-full w-full max-w-lg mx-auto bg-white shadow-sm'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm pr-2' type="text" placeholder='Search handcrafted collections...'/>
        <img className='w-4 opacity-70' src={assets.search_icon} alt="Search" />
      </div>
      <img onClick={()=>setShowSearch(false)} className='inline w-3.5 ml-3 cursor-pointer opacity-70 hover:opacity-100 transition-opacity' src={assets.cross_icon} alt="Close search" />
    </div>
  ) : null
}

export default SearchBar
