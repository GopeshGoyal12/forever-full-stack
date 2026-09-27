import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate, getCartCount } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (
    <div className='max-w-[1400px] mx-auto w-full border-t border-saarthi-brown/20 pt-8 sm:pt-14'>

      <div className='text-2xl mb-4 sm:mb-6'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {cartData.length === 0 ? (
        <div className='py-16 text-center text-saarthi-dark'>
          <p className='font-display text-xl mb-4'>Your shopping bag is empty.</p>
          <p className='text-saarthi-muted font-light mb-8'>Discover our exclusive handcrafted heirlooms and artisanal couture.</p>
          <button onClick={() => navigate('/collection')} className='bg-saarthi-dark text-saarthi-ivory px-8 py-3 text-xs tracking-widest uppercase hover:bg-saarthi-maroon transition-colors'>
            Explore Collections
          </button>
        </div>
      ) : (
        <div>
          <div>
            {
              cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);
                if (!productData) return null;

                return (
                  <div key={index} className='py-4 border-t border-b border-saarthi-brown/10 text-gray-700 flex items-center justify-between gap-3 sm:gap-6'>
                    <div className='flex items-start gap-3 sm:gap-6 min-w-0 flex-1'>
                      <img className='w-16 h-20 sm:w-20 sm:h-24 object-cover flex-shrink-0 rounded-sm' src={productData.image[0]} alt="" />
                      <div className='min-w-0 flex-1'>
                        <p className='text-sm sm:text-lg font-medium text-saarthi-dark truncate'>{productData.name}</p>
                        <div className='flex flex-wrap items-center gap-2 sm:gap-4 mt-1.5 sm:mt-2 text-xs sm:text-sm'>
                          <p className='font-medium'>{currency}{productData.price}</p>
                          <p className='px-2 py-0.5 sm:px-3 sm:py-1 border border-saarthi-brown/20 bg-slate-50 rounded-sm'>{item.size}</p>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-3 sm:gap-6 flex-shrink-0'>
                      <input 
                        onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                        className='border border-gray-300 w-12 sm:w-16 px-1.5 sm:px-2 py-1 text-center text-sm rounded outline-none' 
                        type="number" 
                        min={1} 
                        defaultValue={item.quantity} 
                      />
                      <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 sm:w-5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity' src={assets.bin_icon} alt="Remove item" />
                    </div>
                  </div>
                )
              })
            }
          </div>

          <div className='flex justify-end my-12 sm:my-20'>
            <div className='w-full sm:w-[450px]'>
              <CartTotal />
              <div className='w-full text-center sm:text-end'>
                <button
                  onClick={() => {
                    if (getCartCount() === 0) {
                      toast.error('Your cart is empty');
                      return;
                    }
                    navigate('/place-order')
                  }}
                  className='w-full sm:w-auto bg-black text-white text-xs sm:text-sm my-6 sm:my-8 px-8 py-3.5 tracking-wider active:bg-gray-800 uppercase transition-colors'
                  disabled={getCartCount() === 0}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Cart
