import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import Stripe from 'stripe'

// global variables
const currency = (process.env.CURRENCY || 'usd').toLowerCase();
const deliveryCharge = 10;

// Gateway helper with validation
const getStripeInstance = () => {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key || key.trim() === '' || key === 'your_test_secret_key_here') {
        const error = new Error('Stripe Secret Key is not configured. Please add your Stripe Test Secret Key (STRIPE_SECRET_KEY=sk_test_...) into backend/.env');
        error.code = 'STRIPE_KEY_NOT_CONFIGURED';
        throw error;
    }
    return new Stripe(key);
}

// Placing orders using COD Method
const placeOrder = async (req,res) => {
    
    try {
        const { userId, items, address } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.json({ success: false, message: 'Cart is empty' });
        }
        if (!address || typeof address !== 'object') {
            return res.json({ success: false, message: 'Invalid delivery address' });
        }

        // Validate items and compute trusted prices directly from MongoDB
        let calculatedSubtotal = 0;
        const validatedItems = [];

        for (const item of items) {
            if (!item._id || !item.quantity || Number(item.quantity) <= 0) {
                return res.json({ success: false, message: 'Invalid product item in cart' });
            }

            const product = await productModel.findById(item._id);
            if (!product) {
                return res.json({ success: false, message: `Product not found: ${item.name || item._id}` });
            }

            const trustedPrice = Number(product.price);
            const quantity = Number(item.quantity);
            calculatedSubtotal += trustedPrice * quantity;

            validatedItems.push({
                _id: product._id,
                name: product.name,
                price: trustedPrice,
                quantity: quantity,
                size: item.size || 'M',
                image: product.image
            });
        }

        if (calculatedSubtotal <= 0) {
            return res.json({ success: false, message: 'Invalid order amount' });
        }

        const totalAmount = calculatedSubtotal + deliveryCharge;

        const orderData = {
            userId,
            items: validatedItems,
            address,
            amount: totalAmount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        const origin = req.headers.origin || process.env.CLIENT_URL || 'http://localhost:5173';

        if (!Array.isArray(items) || items.length === 0) {
            return res.json({ success: false, message: 'Cart is empty' });
        }
        if (!address || typeof address !== 'object') {
            return res.json({ success: false, message: 'Invalid delivery address' });
        }

        // Validate items and calculate trusted prices from database
        let calculatedSubtotal = 0;
        const validatedItems = [];
        const line_items = [];

        for (const item of items) {
            if (!item._id || !item.quantity || Number(item.quantity) <= 0) {
                return res.json({ success: false, message: 'Invalid product item in cart' });
            }

            const product = await productModel.findById(item._id);
            if (!product) {
                return res.json({ success: false, message: `Product not found: ${item.name || item._id}` });
            }

            const trustedPrice = Number(product.price);
            const quantity = Number(item.quantity);
            calculatedSubtotal += trustedPrice * quantity;

            validatedItems.push({
                _id: product._id,
                name: product.name,
                price: trustedPrice,
                quantity: quantity,
                size: item.size || 'M',
                image: product.image
            });

            line_items.push({
                price_data: {
                    currency: currency,
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: Math.round(trustedPrice * 100),
                },
                quantity: quantity,
            });
        }

        if (calculatedSubtotal <= 0) {
            return res.json({ success: false, message: 'Invalid order amount' });
        }

        const totalAmount = calculatedSubtotal + deliveryCharge;

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Fee',
                },
                unit_amount: Math.round(deliveryCharge * 100),
            },
            quantity: 1,
        });

        // Create pending order record in MongoDB
        const orderData = {
            userId,
            items: validatedItems,
            address,
            amount: totalAmount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Initialize Stripe client
        let stripe;
        try {
            stripe = getStripeInstance();
        } catch (initErr) {
            await orderModel.findByIdAndDelete(newOrder._id);
            return res.json({ success: false, message: initErr.message });
        }

        // Create Stripe Checkout Session
        try {
            const session = await stripe.checkout.sessions.create({
                success_url: `${origin}/verify?success=true&orderId=${newOrder._id}&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
                line_items,
                mode: 'payment',
                customer_email: address.email ? address.email : undefined,
                metadata: {
                    orderId: newOrder._id.toString(),
                    userId: userId.toString(),
                }
            });

            // Save Stripe sessionId on order document
            await orderModel.findByIdAndUpdate(newOrder._id, { sessionId: session.id });

            res.json({ success: true, session_url: session.url });
        } catch (stripeErr) {
            await orderModel.findByIdAndDelete(newOrder._id);
            console.error('Stripe session creation failed:', stripeErr.message);
            res.json({ success: false, message: stripeErr.message || 'Failed to initialize payment gateway' });
        }

    } catch (error) {
        console.error('placeOrderStripe error:', error);
        res.json({ success: false, message: error.message });
    }
}

// Verify Stripe 
const verifyStripe = async (req, res) => {
    try {
        const { orderId, success, userId, sessionId } = req.body;

        if (!orderId) {
            return res.json({ success: false, message: 'Missing order ID' });
        }

        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.json({ success: false, message: 'Order not found' });
        }

        // Verify order ownership
        if (order.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized order verification' });
        }

        // If order is already paid, return success directly (idempotent)
        if (order.payment === true) {
            return res.json({ success: true, message: 'Order is already confirmed' });
        }

        const isSuccessParam = (success === "true" || success === true);

        if (isSuccessParam) {
            let stripe;
            try {
                stripe = getStripeInstance();
            } catch (initErr) {
                return res.json({ success: false, message: initErr.message });
            }

            const sid = sessionId || order.sessionId;
            if (!sid) {
                await orderModel.findByIdAndDelete(orderId);
                return res.json({ success: false, message: 'Missing payment session ID' });
            }

            // Retrieve Stripe checkout session to verify payment authenticity
            const session = await stripe.checkout.sessions.retrieve(sid);

            if (session && session.payment_status === 'paid') {
                // Ensure session metadata matches order
                if (session.metadata && session.metadata.orderId && session.metadata.orderId !== orderId.toString()) {
                    await orderModel.findByIdAndDelete(orderId);
                    return res.json({ success: false, message: 'Payment session mismatch' });
                }

                // Update order to paid
                await orderModel.findByIdAndUpdate(orderId, { payment: true });
                // Clear user's cart in database
                await userModel.findByIdAndUpdate(userId, { cartData: {} });

                return res.json({ success: true, message: 'Payment verified successfully' });
            } else {
                // Payment was not completed according to Stripe
                await orderModel.findByIdAndDelete(orderId);
                return res.json({ success: false, message: 'Payment was not completed' });
            }
        } else {
            // User cancelled checkout or payment failed
            await orderModel.findByIdAndDelete(orderId);
            return res.json({ success: false, message: 'Payment was cancelled or failed' });
        }

    } catch (error) {
        console.error('verifyStripe error:', error.message);
        res.json({ success: false, message: error.message || 'Payment verification failed' });
    }
}

// All Orders data for Admin Panel
const allOrders = async (req,res) => {

    try {
        
        const orders = await orderModel.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// User Order Data For Forntend
const userOrders = async (req,res) => {
    try {
        
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// update order status from Admin Panel
const updateStatus = async (req,res) => {
    try {
        
        const { orderId, status } = req.body

        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        
        // Notify via SSE
        if (updatedOrder) {
            // Prepare notification payload
            const payload = {
                type: 'ORDER_STATUS',
                orderId: updatedOrder._id,
                userId: updatedOrder.user, // ObjectId or string
                status: updatedOrder.status,
                message: `Your order #${updatedOrder._id} status is now ${updatedOrder.status}`,
                timestamp: new Date(),
            };

            // Broadcast to all connected clients (or filter by userId)
            // If you registered clients with userId, pass a filterFn: client => client.userId === payload.userId
            if (typeof global.sendSSE === 'function') {
                global.sendSSE(payload /*, client => client.userId === String(payload.userId) */);
            }
        }

        res.json({success:true,message:'Status Updated', order: updatedOrder})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {verifyStripe, placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus}