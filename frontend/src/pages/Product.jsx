import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency ,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size,setSize] = useState('')

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })

  }

  useEffect(() => {
    fetchProductData();
  }, [productId,products])

  return productData ? (
    <div className='max-w-[1400px] mx-auto w-full border-t border-saarthi-brown/20 pt-6 sm:pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*----------- Product Data-------------- */}
      <div className='flex gap-8 sm:gap-10 lg:gap-14 flex-col sm:flex-row'>

        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:gap-4 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-2 sm:gap-3 sm:w-[20%] w-full pb-2 sm:pb-0'>
              {
                productData.image.map((item,index)=>(
                  <img onClick={()=>setImage(item)} src={item} key={index} className={`w-16 h-20 sm:w-full sm:h-24 md:h-28 object-cover flex-shrink-0 cursor-pointer border transition-all ${item === image ? 'border-saarthi-maroon' : 'border-saarthi-brown/20'}`} alt="" />
                ))
              }
          </div>
          <div className='w-full sm:w-[80%] max-h-[550px] lg:max-h-[650px] flex items-center justify-center bg-saarthi-ivory/40 rounded-sm overflow-hidden'>
              <img className='w-full h-auto max-h-[550px] lg:max-h-[650px] object-contain sm:object-cover' src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1'>
          <h1 className='font-display text-2xl sm:text-3xl mt-2 text-saarthi-dark'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-3.5" />
              <img src={assets.star_icon} alt="" className="w-3.5" />
              <img src={assets.star_icon} alt="" className="w-3.5" />
              <img src={assets.star_icon} alt="" className="w-3.5" />
              <img src={assets.star_dull_icon} alt="" className="w-3.5" />
              <p className='pl-2 text-xs sm:text-sm text-gray-500'>(122)</p>
          </div>
          <p className='mt-4 sm:mt-5 text-2xl sm:text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-4 text-gray-500 font-light leading-relaxed md:w-4/5 text-sm sm:text-base'>{productData.description}</p>
          <div className='flex flex-col gap-3 my-6 sm:my-8'>
              <p className='text-sm font-medium'>Select Size</p>
              <div className='flex flex-wrap gap-2'>
                {productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 min-w-[42px] text-sm text-center transition-colors ${item === size ? 'border-saarthi-maroon bg-saarthi-maroon/10 text-saarthi-maroon font-medium' : 'border-gray-200'}`} key={index}>{item}</button>
                ))}
              </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className='w-full sm:w-auto bg-black text-white px-8 py-3.5 text-sm tracking-widest uppercase active:bg-gray-700 transition-colors'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5 border-gray-200' />
          <div className='text-xs sm:text-sm text-gray-500 mt-5 flex flex-col gap-1.5'>
              <p>100% Original handcrafted product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      <div className='mt-16 sm:mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border-t border-r border-b px-5 py-3 text-sm text-gray-500'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-4 sm:px-6 py-6 text-sm text-gray-500 font-light leading-relaxed'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>

      {/* --------- display related products ---------- */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product
