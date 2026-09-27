import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-16 sm:w-20 md:w-60 lg:w-64 min-h-full bg-saarthi-ivory border-r border-saarthi-brown/20 flex-shrink-0'>
        <div className='flex flex-col pt-4 sm:pt-8'>

            <NavLink className='flex items-center justify-center md:justify-start gap-3 md:gap-4 px-3 md:px-6 py-3.5 sm:py-4 text-saarthi-muted hover:bg-saarthi-cream hover:text-saarthi-dark transition-colors border-r-4 border-transparent font-sans uppercase tracking-[0.2em] text-xs' to="/add" title="Add Items">
                <img className='w-4 h-4 opacity-70 grayscale flex-shrink-0' src={assets.add_icon} alt="" />
                <p className='hidden md:block whitespace-nowrap'>Add Items</p>
            </NavLink>

            <NavLink className='flex items-center justify-center md:justify-start gap-3 md:gap-4 px-3 md:px-6 py-3.5 sm:py-4 text-saarthi-muted hover:bg-saarthi-cream hover:text-saarthi-dark transition-colors border-r-4 border-transparent font-sans uppercase tracking-[0.2em] text-xs' to="/list" title="List Items">
                <img className='w-4 h-4 opacity-70 grayscale flex-shrink-0' src={assets.order_icon} alt="" />
                <p className='hidden md:block whitespace-nowrap'>List Items</p>
            </NavLink>

            <NavLink className='flex items-center justify-center md:justify-start gap-3 md:gap-4 px-3 md:px-6 py-3.5 sm:py-4 text-saarthi-muted hover:bg-saarthi-cream hover:text-saarthi-dark transition-colors border-r-4 border-transparent font-sans uppercase tracking-[0.2em] text-xs' to="/orders" title="Orders">
                <img className='w-4 h-4 opacity-70 grayscale flex-shrink-0' src={assets.order_icon} alt="" />
                <p className='hidden md:block whitespace-nowrap'>Orders</p>
            </NavLink>

            <NavLink className='flex items-center justify-center md:justify-start gap-3 md:gap-4 px-3 md:px-6 py-3.5 sm:py-4 text-saarthi-muted hover:bg-saarthi-cream hover:text-saarthi-dark transition-colors border-r-4 border-transparent font-sans uppercase tracking-[0.2em] text-xs' to="/concerns" title="Concerns">
                <img className='w-4 h-4 opacity-70 grayscale flex-shrink-0' src={assets.order_icon} alt="" />
                <p className='hidden md:block whitespace-nowrap'>Concerns</p>
            </NavLink>

        </div>

    </div>
  )
}

export default Sidebar