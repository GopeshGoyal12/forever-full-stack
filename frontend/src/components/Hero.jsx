import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

const Hero = () => {
  const containerRef = useRef(null)

  // Setup Framer Motion scroll hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects based on scroll position
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const threadDraw = useTransform(scrollYProgress, [0, 0.8], [400, 0])

  return (
    <section ref={containerRef} className='relative w-full min-h-[85vh] sm:min-h-[90vh] lg:h-[92vh] bg-saarthi-dark overflow-hidden flex items-center justify-center mb-12 sm:mb-20'>
      
      {/* Background Image - Full Bleed */}
      <motion.div 
        style={{ scale: imageScale }}
        className='absolute inset-0 z-0 origin-top'
      >
        <img 
          src="/hero_background.png" 
          alt="Indian Embroidery Textile" 
          className='w-full h-full object-cover opacity-60' 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-saarthi-dark/50 via-saarthi-dark/20 to-saarthi-ivory"></div>
      </motion.div>

      {/* Center Content */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className='relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 py-16 sm:py-24 max-w-5xl mx-auto'
      >
        <p className='font-sans tracking-[0.3em] text-[10px] sm:text-xs md:text-sm text-saarthi-gold uppercase mb-4 sm:mb-6 font-medium'>
          Heritage & Craftsmanship
        </p>
        
        <h1 className='font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-saarthi-cream leading-[1.1] mb-6 sm:mb-8 drop-shadow-xl'>
          The Thread <br/><span className='italic font-light text-saarthi-gold'>of Tradition</span>
        </h1>
        
        <p className='text-saarthi-ivory/90 text-sm sm:text-base md:text-lg lg:text-xl font-light mb-8 sm:mb-12 max-w-2xl leading-relaxed drop-shadow-md px-2'>
          Experience the finest handcrafted fashion, woven with the stories and soul of Indian women artisans.
        </p>

        <Link to='/collection'>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className='px-8 sm:px-12 py-3.5 sm:py-4 bg-saarthi-maroon text-saarthi-ivory font-display tracking-[0.2em] uppercase text-xs sm:text-sm border border-saarthi-maroon hover:bg-transparent hover:border-saarthi-ivory transition-colors duration-500 shadow-xl'
          >
            Discover The Collection
          </motion.button>
        </Link>
      </motion.div>

      {/* Flowing Thread SVG */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-48 sm:h-64 z-20 pointer-events-none">
        <svg viewBox="0 0 100 400" className="w-full h-full overflow-visible">
          <motion.path 
            d="M 50 0 C 50 100, 100 150, 50 200 C 0 250, 50 300, 50 400" 
            fill="transparent" 
            stroke="#c9a25b" 
            strokeWidth="3"
            strokeLinecap="round"
            style={{ 
              strokeDasharray: 400,
              strokeDashoffset: threadDraw 
            }}
          />
        </svg>
      </div>

    </section>
  )
}

export default Hero
