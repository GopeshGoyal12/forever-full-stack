import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const [loading, setLoading] = useState(false);
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            if (!token) {
                toast.error('Please log in to place an order');
                navigate('/login');
                return;
            }

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            if (orderItems.length === 0 || getCartAmount() === 0) {
                toast.error('Your cart is empty')
                return;
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            setLoading(true);

            switch (method) {

                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
                    if (response.data.success) {
                        setCartItems({})
                        toast.success('Order placed successfully!')
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    setLoading(false);
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message || 'Failed to initiate Stripe checkout')
                        setLoading(false);
                    }
                    break;

                default:
                    setLoading(false);
                    break;
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
            setLoading(false);
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className='max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row justify-between gap-8 lg:gap-14 pt-6 sm:pt-12 min-h-[80vh] border-t border-saarthi-brown/20'>
            {/* ------------- Left Side ---------------- */}
            <div className='flex flex-col gap-4 w-full lg:max-w-xl'>

                <div className='text-xl sm:text-2xl my-2 sm:my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className='flex flex-col sm:flex-row gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-2 px-3.5 w-full text-sm outline-none focus:border-saarthi-maroon' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-2 px-3.5 w-full text-sm outline-none focus:border-saarthi-maroon' type="text" placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-2 px-3.5 w-full text-sm outline-none focus:border-saarthi-maroon' type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-2 px-3.5 w-full text-sm outline-none focus:border-saarthi-maroon' type="text" placeholder='Street' />
                <div className='flex flex-col sm:flex-row gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-2 px-3.5 w-full text-sm outline-none focus:border-saarthi-maroon' type="text" placeholder='City' />
                    <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-2 px-3.5 w-full text-sm outline-none focus:border-saarthi-maroon' type="text" placeholder='State' />
                </div>
                <div className='flex flex-col sm:flex-row gap-3'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-2 px-3.5 w-full text-sm outline-none focus:border-saarthi-maroon' type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-2 px-3.5 w-full text-sm outline-none focus:border-saarthi-maroon' type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-2 px-3.5 w-full text-sm outline-none focus:border-saarthi-maroon' type="number" placeholder='Phone' />
            </div>

            {/* ------------- Right Side ------------------ */}
            <div className='w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 mt-4 lg:mt-0'>

                <div className='w-full'>
                    <CartTotal />
                </div>

                <div className='mt-8 sm:mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    {/* --------------- Payment Method Selection ------------- */}
                    <div className='flex gap-3 flex-col sm:flex-row'>
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2.5 px-3.5 cursor-pointer flex-1 rounded-sm'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
                            <img className='h-5 mx-2' src={assets.stripe_logo} alt="Stripe" />
                        </div>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2.5 px-3.5 cursor-pointer flex-1 rounded-sm'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
                            <p className='text-gray-600 text-xs sm:text-sm font-medium'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='w-full text-center sm:text-end mt-6 sm:mt-8'>
                        <button 
                            type='submit' 
                            disabled={loading}
                            className={`w-full sm:w-auto bg-black text-white px-10 py-3.5 text-xs sm:text-sm tracking-wider uppercase transition-colors flex items-center justify-center gap-2 mx-auto sm:ml-auto sm:mr-0 ${loading ? 'opacity-70 cursor-not-allowed' : 'active:bg-gray-800'}`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                    <span>PROCESSING...</span>
                                </>
                            ) : (
                                'PLACE ORDER'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder