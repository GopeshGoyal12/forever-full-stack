import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  const imgSrc = Array.isArray(image) && image.length > 0 ? image[0] : (typeof image === 'string' ? image : '/product_saree.png');

  return (
    <div className="group h-full">
      <Link 
        onClick={() => window.scrollTo(0, 0)} 
        className='block h-full cursor-pointer bg-saarthi-ivory overflow-hidden editorial-border hover:editorial-shadow transition-all duration-500 rounded-sm' 
        to={`/product/${id}`}
      >
        
        <div className='relative w-full aspect-[3/4] overflow-hidden bg-saarthi-cream'>
          <motion.img 
            initial={{ scale: 1.1, filter: 'blur(4px)' }}
            whileInView={{ scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out' 
            src={imgSrc} 
            alt={name || "Product"} 
            loading="lazy"
          />
          
          {/* Handcrafted Tag Overlay */}
          <div className='absolute top-2.5 left-2.5 sm:top-4 sm:left-4 border border-saarthi-ivory/50 bg-saarthi-dark/50 backdrop-blur-md px-2 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[9px] font-sans tracking-[0.2em] text-saarthi-ivory uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            Artisan Made
          </div>
        </div>

        <div className='p-3 sm:p-4 md:p-5 flex flex-col justify-between bg-saarthi-ivory text-center border-t border-saarthi-brown/10'>
          <p className='text-saarthi-dark font-display text-xs sm:text-sm md:text-base mb-1 sm:mb-2 truncate group-hover:text-saarthi-maroon transition-colors duration-300'>
            {name}
          </p>
          <div className='flex items-center justify-center gap-2 sm:gap-3'>
            <span className='w-2 sm:w-4 h-[1px] bg-saarthi-gold/50 group-hover:bg-saarthi-maroon transition-colors duration-300'></span>
            <p className='text-xs sm:text-sm font-light tracking-wider sm:tracking-widest text-saarthi-brown'>
              {currency}{price}
            </p>
            <span className='w-2 sm:w-4 h-[1px] bg-saarthi-gold/50 group-hover:bg-saarthi-maroon transition-colors duration-300'></span>
          </div>
        </div>

      </Link>
    </div>
  )
}

export default ProductItem
