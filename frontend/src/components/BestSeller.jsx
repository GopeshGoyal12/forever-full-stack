import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion'

const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0, 5))
    },[products])

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
      }
    }

    const itemVariants = {
      hidden: { opacity: 0, scale: 0.95, y: 20 },
      visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
    }

  return (
    <section className='my-16 sm:my-24 max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12'>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className='text-center py-6 sm:py-10'
      >
        <div className='text-2xl sm:text-3xl md:text-4xl'>
          <Title text1={'BEST'} text2={'SELLERS'}/>
        </div>
        <p className='w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-saarthi-muted font-light mt-4 sm:mt-6 max-w-2xl tracking-wide'>
          Explore our most loved handcrafted collections. Each piece carries the warmth and dedication of its maker.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 lg:gap-6 gap-y-8 sm:gap-y-12'
      >
        {
            bestSeller.map((item, index)=>(
                <motion.div key={item._id || index} variants={itemVariants} className="h-full">
                  <ProductItem id={item._id} name={item.name} image={item.image} price={item.price} />
                </motion.div>
            ))
        }
      </motion.div>
    </section>
  )
}

export default BestSeller
