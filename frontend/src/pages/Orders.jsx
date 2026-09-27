import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token , currency} = useContext(ShopContext);

  const [orderData,setorderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className='max-w-[1400px] mx-auto w-full border-t border-saarthi-brown/20 pt-8 sm:pt-14'>

        <div className='text-2xl mb-6'>
            <Title text1={'MY'} text2={'ORDERS'}/>
        </div>

        {orderData.length === 0 ? (
          <div className='py-16 text-center text-saarthi-dark'>
            <p className='font-display text-xl mb-3'>No orders found.</p>
            <p className='text-saarthi-muted font-light mb-6 text-sm'>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
              {
                orderData.map((item,index) => (
                  <div key={index} className='p-4 sm:p-5 border border-saarthi-brown/10 bg-saarthi-ivory/30 rounded-sm text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                      <div className='flex items-start gap-4 sm:gap-6 text-sm flex-1 min-w-0'>
                          <img className='w-16 h-20 sm:w-20 sm:h-24 object-cover flex-shrink-0 rounded-sm' src={item.image[0]} alt="" />
                          <div className='min-w-0 flex-1'>
                            <p className='sm:text-base font-medium text-saarthi-dark truncate'>{item.name}</p>
                            <div className='flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-sm text-gray-700'>
                              <p className='font-medium'>{currency}{item.price}</p>
                              <p className='text-xs text-saarthi-muted'>Qty: {item.quantity}</p>
                              <p className='px-2 py-0.5 border border-saarthi-brown/20 bg-slate-50 text-xs rounded'>{item.size}</p>
                            </div>
                            <p className='mt-2 text-xs text-gray-500'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                            <p className='mt-0.5 text-xs text-gray-500'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                          </div>
                      </div>
                      <div className='flex items-center justify-between md:w-1/2 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 gap-4'>
                          <div className='flex items-center gap-2'>
                              <p className='w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0'></p>
                              <p className='text-xs sm:text-sm md:text-base font-light'>{item.status}</p>
                          </div>
                          <button onClick={loadOrderData} className='border border-saarthi-brown/20 bg-white hover:bg-saarthi-ivory px-4 py-2 text-xs font-sans tracking-wider uppercase rounded-sm transition-colors'>Track Order</button>
                      </div>
                  </div>
                ))
              }
          </div>
        )}
    </div>
  )
}

export default Orders
