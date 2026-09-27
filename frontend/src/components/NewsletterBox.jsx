import React from 'react'
import { motion } from 'framer-motion'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className='text-center my-16 sm:my-24 md:my-32 px-4 max-w-3xl mx-auto'
    >
      <h2 className='text-2xl sm:text-4xl font-display text-saarthi-dark mb-4'>Join The <span className='italic font-light text-saarthi-maroon'>Saarthi</span> Family</h2>
      <p className='text-saarthi-muted mt-3 font-light max-w-xl mx-auto leading-relaxed text-sm sm:text-base'>
        Subscribe to our newsletter for exclusive access to new handcrafted collections, stories from our artisans, and special privileges.
      </p>
      
      <form onSubmit={onSubmitHandler} className='w-full sm:w-4/5 md:w-3/4 flex flex-col sm:flex-row items-stretch border border-saarthi-brown/30 mx-auto my-8 bg-saarthi-ivory/50 backdrop-blur-sm shadow-sm'>
        <input 
          className='w-full sm:flex-1 outline-none bg-transparent px-4 sm:px-6 py-3.5 sm:py-4 text-saarthi-dark placeholder-saarthi-muted/50 font-light text-sm' 
          type="email" 
          placeholder='Enter your email address' 
          required
        />
        <motion.button 
          whileHover={{ backgroundColor: '#5c1a1b', color: '#f8f5f0' }}
          type='submit' 
          className='bg-saarthi-dark text-saarthi-ivory text-xs tracking-[0.2em] uppercase px-6 sm:px-8 py-3.5 sm:py-4 border-t sm:border-t-0 sm:border-l border-saarthi-brown/30 transition-colors duration-300'
        >
          Subscribe
        </motion.button>
      </form>
    </motion.div>
  )
}

export default NewsletterBox
