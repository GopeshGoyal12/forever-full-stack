import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }

    try {

      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }


  }

  const statusHandler = async ( event, orderId ) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status' , {orderId, status:event.target.value}, { headers: {token}})
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div className='w-full'>
      <p className='font-sans uppercase tracking-[0.3em] text-xs text-saarthi-muted mb-6'>Client Orders</p>
      <div className='flex flex-col gap-4'>
        {orders.length === 0 ? (
          <div className='p-8 text-center bg-saarthi-ivory border border-saarthi-brown/10 text-saarthi-muted'>No client orders found.</div>
        ) : (
          orders.map((order, index) => (
            <div className='grid grid-cols-1 md:grid-cols-[48px_2fr_1.2fr] lg:grid-cols-[48px_2.5fr_1.5fr_1fr_1.5fr] gap-4 sm:gap-6 items-start border border-saarthi-brown/20 bg-saarthi-ivory shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6 md:p-8 text-sm font-light text-saarthi-dark rounded-sm' key={index}>
              <img className='w-10 sm:w-12 opacity-70 grayscale flex-shrink-0' src={assets.parcel_icon} alt="" />
              <div className='min-w-0'>
                <div className='mb-3 sm:mb-4'>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return <p className='py-0.5 font-display text-base sm:text-lg break-words' key={index}> {item.name} <span className='text-saarthi-muted font-sans text-xs'>x {item.quantity} ({item.size})</span> </p>
                    }
                    else {
                      return <p className='py-0.5 font-display text-base sm:text-lg break-words' key={index}> {item.name} <span className='text-saarthi-muted font-sans text-xs'>x {item.quantity} ({item.size})</span> ,</p>
                    }
                  })}
                </div>
                <p className='mt-2 mb-1 font-sans font-medium uppercase tracking-widest text-xs'>{order.address.firstName + " " + order.address.lastName}</p>
                <div className='text-saarthi-muted text-xs sm:text-sm leading-relaxed'>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p className='text-saarthi-muted mt-1 text-xs'>{order.address.phone}</p>
              </div>
              <div className='flex flex-col gap-1.5 sm:gap-2 text-xs sm:text-sm'>
                <p><span className='text-saarthi-muted uppercase text-xs tracking-widest'>Items:</span> {order.items.length}</p>
                <p><span className='text-saarthi-muted uppercase text-xs tracking-widest'>Method:</span> {order.paymentMethod}</p>
                <p><span className='text-saarthi-muted uppercase text-xs tracking-widest'>Payment:</span> <span className={order.payment ? 'text-green-700 font-medium' : 'text-saarthi-maroon font-medium'}>{ order.payment ? 'Complete' : 'Pending' }</span></p>
                <p><span className='text-saarthi-muted uppercase text-xs tracking-widest'>Date:</span> {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className='flex items-center justify-between lg:block'>
                <span className='lg:hidden text-xs uppercase tracking-widest text-saarthi-muted'>Amount:</span>
                <p className='text-lg sm:text-xl font-display font-medium text-saarthi-dark'>{currency}{order.amount}</p>
              </div>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='w-full px-3 py-2.5 sm:px-4 sm:py-3 font-sans uppercase tracking-wider text-xs border border-saarthi-brown/20 bg-saarthi-cream cursor-pointer focus:border-saarthi-gold outline-none'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Orders