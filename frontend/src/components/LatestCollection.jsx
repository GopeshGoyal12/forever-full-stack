import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion'

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0, 10));
    }, [products])

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
      }
    }

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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
            <Title text1={'LATEST'} text2={'COLLECTIONS'} />
          </div>
          <p className='w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-saarthi-muted font-light mt-4 sm:mt-6 max-w-2xl tracking-wide'>
            Discover our latest handcrafted collection, where traditional artistry meets modern elegance. Every piece is a testament to the skill of Indian women artisans.
          </p>
      </motion.div>

      {/* Rendering Products */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 lg:gap-6 gap-y-8 sm:gap-y-12'
      >
        {
          latestProducts.map((item, index)=>(
            <motion.div key={item._id || index} variants={itemVariants} className="h-full">
              <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
            </motion.div>
          ))
        }
      </motion.div>
    </section>
  )
}

export default LatestCollection
