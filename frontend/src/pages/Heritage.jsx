import React from 'react'
import { motion } from 'framer-motion'
import AnimatedImage from '../components/AnimatedImage'

const Heritage = () => {
  return (
    <div className='w-full min-h-screen bg-saarthi-ivory pt-10 sm:pt-20 pb-16 sm:pb-24'>
      <div className='max-w-[1400px] mx-auto w-full'>
        
        {/* Header Section */}
        <div className='text-center mb-12 sm:mb-20 md:mb-32 px-4'>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='font-sans tracking-[0.3em] text-xs sm:text-sm text-saarthi-gold uppercase mb-3 sm:mb-4'
          >
            The Journey
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className='font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-saarthi-dark leading-tight mb-6 sm:mb-8 max-w-4xl mx-auto'
          >
            A Tapestry of <span className='italic font-light text-saarthi-maroon'>Tradition</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className='text-saarthi-muted text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed'
          >
            From the looms of Varanasi to the dyers of Rajasthan, explore the rich textile heritage that defines the soul of India.
          </motion.p>
        </div>

        {/* Masonry-style Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16 sm:mb-24 md:mb-32'>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className='flex flex-col gap-4 sm:gap-6'
          >
            <AnimatedImage 
              src="https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?q=80&w=2070&auto=format&fit=crop" 
              alt="Handloom Weaving" 
              containerClassName="aspect-[4/5] w-full"
            />
            <div>
              <h3 className='font-display text-xl sm:text-2xl text-saarthi-dark mb-2'>The Sacred Loom</h3>
              <p className='text-saarthi-muted font-light text-sm sm:text-base'>The rhythmic clack of the handloom is the heartbeat of Indian textiles.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className='flex flex-col gap-4 sm:gap-6 mt-0 md:mt-24'
          >
            <AnimatedImage 
              src="https://images.unsplash.com/photo-1621801314352-789a7fb385e0?q=80&w=2070&auto=format&fit=crop" 
              alt="Natural Dyes" 
              containerClassName="aspect-square w-full"
            />
            <div>
              <h3 className='font-display text-xl sm:text-2xl text-saarthi-dark mb-2'>Colors of the Earth</h3>
              <p className='text-saarthi-muted font-light text-sm sm:text-base'>Indigo, madder, and turmeric bring our fabrics to life through natural block printing.</p>
            </div>
          </motion.div>
        </div>

        {/* Quote Section */}
        <div className='py-12 sm:py-20 md:py-24 border-t border-b border-saarthi-brown/20 text-center px-4'>
          <h2 className='font-display text-2xl sm:text-4xl md:text-5xl text-saarthi-maroon leading-tight max-w-4xl mx-auto'>
            "To wear a handwoven garment is to wrap yourself in history."
          </h2>
        </div>

      </div>
    </div>
  )
}

export default Heritage
