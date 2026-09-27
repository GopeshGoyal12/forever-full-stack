import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {

      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='w-full'>
      <p className='font-sans uppercase tracking-[0.3em] text-xs text-saarthi-muted mb-6'>Collection Inventory</p>
      <div className='flex flex-col gap-3'>

        {/* ------- List Table Title ---------- */}
        <div className='hidden md:grid grid-cols-[80px_2.5fr_1.5fr_1fr_100px] items-center py-3.5 px-6 border border-saarthi-brown/20 bg-saarthi-ivory text-xs font-sans tracking-widest uppercase text-saarthi-dark'>
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p className='text-center'>Action</p>
        </div>

        {/* ------ Product List ------ */}
        {
          list.map((item, index) => (
            <div className='flex flex-col md:grid md:grid-cols-[80px_2.5fr_1.5fr_1fr_100px] items-start md:items-center gap-3 md:gap-4 p-4 md:px-6 md:py-3 border border-saarthi-brown/10 bg-saarthi-ivory/50 rounded-sm hover:bg-saarthi-ivory transition-colors text-sm font-light text-saarthi-dark' key={index}>
              <div className='flex items-center gap-3 w-full md:w-auto min-w-0'>
                <img className='w-14 h-18 sm:w-16 sm:h-20 object-cover shadow-sm editorial-border flex-shrink-0' src={item.image[0]} alt="" />
                <div className='md:hidden flex-1 min-w-0'>
                  <p className='font-display text-base font-normal text-saarthi-dark truncate'>{item.name}</p>
                  <p className='text-xs uppercase tracking-wider text-saarthi-muted mt-0.5'>{item.category}</p>
                  <p className='font-medium text-saarthi-dark mt-1'>{currency}{item.price}</p>
                </div>
              </div>
              <p className='hidden md:block font-display text-base lg:text-lg truncate pr-2'>{item.name}</p>
              <p className='hidden md:block uppercase tracking-widest text-xs'>{item.category}</p>
              <p className='hidden md:block font-medium'>{currency}{item.price}</p>
              <div className='w-full md:w-auto flex justify-end md:justify-center pt-2 md:pt-0 border-t md:border-t-0 border-saarthi-brown/10'>
                <button onClick={()=>removeProduct(item._id)} className='text-saarthi-maroon hover:text-saarthi-terracotta transition-colors font-sans uppercase tracking-widest text-[11px] sm:text-xs py-1 px-3 border border-saarthi-maroon/20 hover:border-saarthi-maroon rounded-sm'>Remove</button>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default List