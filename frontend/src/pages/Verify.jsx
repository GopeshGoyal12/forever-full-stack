import React, { useContext, useEffect, useRef, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {

    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams] = useSearchParams()
    
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const sessionId = searchParams.get('session_id')
    const [statusMessage, setStatusMessage] = useState('Verifying your payment with Stripe...')
    const verifiedRef = useRef(false)

    const verifyPayment = async () => {
        // Prevent double execution in React StrictMode
        if (verifiedRef.current) return;

        const authToken = token || localStorage.getItem('token')
        if (!authToken) {
            return;
        }

        if (!orderId) {
            toast.error('Invalid payment return: missing order details')
            navigate('/cart')
            return;
        }

        verifiedRef.current = true

        try {
            const response = await axios.post(
                backendUrl + '/api/order/verifyStripe',
                { success, orderId, sessionId },
                { headers: { token: authToken } }
            )

            if (response.data.success) {
                setCartItems({})
                toast.success('Payment successful! Your order has been placed.')
                navigate('/orders')
            } else {
                if (success === 'false') {
                    toast.info('Payment was cancelled. Your cart items are preserved.')
                } else {
                    toast.error(response.data.message || 'Payment verification failed.')
                }
                navigate('/cart')
            }

        } catch (error) {
            console.error('Payment verification error:', error)
            toast.error(error.response?.data?.message || error.message || 'Error verifying payment')
            navigate('/cart')
        }
    }

    useEffect(() => {
        const authToken = token || localStorage.getItem('token')
        if (authToken) {
            verifyPayment()
        }
    }, [token])

    return (
        <div className='min-h-[60vh] flex flex-col items-center justify-center gap-5 text-center px-4'>
            <div className='w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin'></div>
            <p className='text-gray-700 font-medium text-sm sm:text-base tracking-wide'>
                {statusMessage}
            </p>
            <p className='text-gray-400 text-xs'>Please do not close or refresh this page.</p>
        </div>
    )
}

export default Verify