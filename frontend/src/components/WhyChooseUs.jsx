import React from 'react'
import Title from './Title'

const WhyChooseUs = () => {
  return (
    <>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-16 sm:mb-20'>
        <div className='border px-6 sm:px-10 md:px-12 py-6 sm:py-12 md:py-16 flex flex-col gap-4 sm:gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600 font-light leading-relaxed'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='border px-6 sm:px-10 md:px-12 py-6 sm:py-12 md:py-16 flex flex-col gap-4 sm:gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600 font-light leading-relaxed'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className='border px-6 sm:px-10 md:px-12 py-6 sm:py-12 md:py-16 flex flex-col gap-4 sm:gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600 font-light leading-relaxed'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>
    </>
  )
}

export default WhyChooseUs
