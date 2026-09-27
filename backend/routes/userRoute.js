import express from 'express';
import { 
    loginUser, 
    registerUser, 
    registerUserInit, 
    adminLogin, 
    getMe, 
    updateMe, 
    initNameChange, 
    verifyNameChange 
} from '../controllers/userController.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

// Public authentication routes (direct signup & signin, no verification needed)
userRouter.post('/register', registerUser);
userRouter.post('/register-init', registerUserInit);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);

// Fallback OTP verify handler returning success if called
userRouter.post('/verify-otp', (req, res) => {
    res.json({ success: true, message: "Account already active" });
});

// Protected profile routes
userRouter.get('/me', authUser, getMe);
userRouter.put('/me', authUser, updateMe);
userRouter.post('/name-change-init', authUser, initNameChange);
userRouter.post('/name-change-verify', authUser, verifyNameChange);

export default userRouter;