import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='w-full bg-saarthi-maroon text-saarthi-ivory pt-16 sm:pt-20 pb-8 sm:pb-10 mt-24 sm:mt-32 relative overflow-hidden'>
      
      {/* Background Decor */}
      <div className='absolute inset-0 opacity-[0.03] bg-mandala-pattern bg-cover bg-center pointer-events-none'></div>

      <div className='relative z-10 max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-10 sm:gap-12 md:gap-16 mb-12 sm:mb-16 text-sm'>

          <div className='sm:col-span-2 md:col-span-1'>
            <h2 className='font-display text-3xl sm:text-4xl lg:text-5xl text-saarthi-gold tracking-widest uppercase mb-4 sm:mb-6'>
              Saarthi
            </h2>
            <p className='w-full md:w-5/6 text-saarthi-ivory/70 font-light leading-relaxed text-sm sm:text-base tracking-wide'>
              Preserving the heritage of Indian textiles. We empower rural women artisans by bringing their masterful embroidery and handwoven fashion to the world.
            </p>
          </div>

          <div>
            <p className='text-lg sm:text-xl font-display text-saarthi-gold tracking-widest uppercase mb-4 sm:mb-6'>
              Company
            </p>
            <ul className='flex flex-col gap-3 sm:gap-4 text-saarthi-ivory/80 font-light tracking-wide text-sm'>
              <li>
                <Link to='/' className='hover:text-saarthi-gold transition-colors'>Home</Link>
              </li>
              <li>
                <Link to='/collection' className='hover:text-saarthi-gold transition-colors'>Collection</Link>
              </li>
              <li>
                <Link to='/craftsmanship' className='hover:text-saarthi-gold transition-colors'>Craftsmanship</Link>
              </li>
              <li>
                <Link to='/heritage' className='hover:text-saarthi-gold transition-colors'>Heritage</Link>
              </li>
              <li>
                <Link to='/about' className='hover:text-saarthi-gold transition-colors'>Our Story</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className='text-lg sm:text-xl font-display text-saarthi-gold tracking-widest uppercase mb-4 sm:mb-6'>
              Contact
            </p>
            <ul className='flex flex-col gap-3 sm:gap-4 text-saarthi-ivory/80 font-light tracking-wide text-sm'>
              <li className='hover:text-saarthi-gold transition-colors'>+91 98765 43210</li>
              <li className='hover:text-saarthi-gold transition-colors break-all'>namaste@saarthi.com</li>
              <li>
                <Link to='/contact' className='hover:text-saarthi-gold transition-colors underline underline-offset-4'>
                  Customer Concierge
                </Link>
              </li>
              <li className='text-xs uppercase tracking-widest text-saarthi-ivory/50 mt-1'>
                Craftsmen Village, Jaipur, India
              </li>
            </ul>
          </div>

        </div>

        <hr className='border-saarthi-gold/20' />
        <div className='flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 text-[11px] sm:text-xs tracking-widest uppercase text-saarthi-ivory/60 font-light gap-2 text-center sm:text-left'>
          <p>Copyright 2026 © Saarthi</p>
          <p>Handcrafted with Pride in India</p>
        </div>
      </div>

    </footer>
  )
}

export default Footer
