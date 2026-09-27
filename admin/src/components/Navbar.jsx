import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-3.5 sm:py-4 px-4 sm:px-6 md:px-8 justify-between bg-saarthi-ivory border-b border-saarthi-brown/20 flex-shrink-0'>
        <div className='flex flex-col'>
            <h1 className='text-2xl sm:text-3xl font-display text-saarthi-dark tracking-widest uppercase leading-none'>SAARTHI</h1>
            <p className='text-saarthi-gold font-sans uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[9px] sm:text-[10px] mt-1'>Atelier Dashboard</p>
        </div>
        <button onClick={()=>setToken('')} className='border border-saarthi-dark text-saarthi-dark hover:bg-saarthi-dark hover:text-saarthi-ivory transition-colors duration-300 px-4 sm:px-6 py-2 rounded-none text-[11px] sm:text-xs tracking-widest uppercase'>End Session</button>
    </div>
  )
}

export default Navbar