import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Please provide email and password" });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Case-insensitive lookup
        const user = await userModel.findOne({
            $or: [
                { email: normalizedEmail },
                { email: { $regex: new RegExp(`^${normalizedEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } }
            ]
        });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Guarantee account is marked active/verified
            if (!user.isVerified) {
                user.isVerified = true;
                await user.save();
            }

            const token = createToken(user._id);
            res.json({
                success: true,
                token,
                user: { id: user._id, name: user.name, email: user.email },
                message: "Logged in successfully"
            });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log("Login error:", error);
        res.json({ success: false, message: error.message });
    }
};

// Route for user registration (no email or OTP verification required)
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Please fill in all fields" });
        }

        const trimmedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();

        if (trimmedName.length < 2) {
            return res.json({ success: false, message: "Please enter a valid name" });
        }

        // Accept any test or fake email format (does not require domain to exist)
        const isEmailFormat = validator.isEmail(normalizedEmail, { require_tld: false }) || /^[^\s@]+@[^\s@]+$/.test(normalizedEmail);
        if (!isEmailFormat) {
            return res.json({ success: false, message: "Please enter a valid email format" });
        }

        // Existing password validation rule
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        // Check if user already exists
        const exists = await userModel.findOne({
            $or: [
                { email: normalizedEmail },
                { email: { $regex: new RegExp(`^${normalizedEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } }
            ]
        });

        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Directly create user in database with active/verified status
        const newUser = new userModel({
            name: trimmedName,
            email: normalizedEmail,
            password: hashedPassword,
            cartData: {},
            isVerified: true
        });

        const user = await newUser.save();

        // Generate token for immediate automatic login
        const token = createToken(user._id);

        res.json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email },
            message: "User registered successfully"
        });

    } catch (error) {
        console.log("Register error:", error);
        res.json({ success: false, message: error.message });
    }
};

// Alias for backwards compatibility
const registerUserInit = registerUser;

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log("Admin login error:", error);
        res.json({ success: false, message: error.message });
    }
};

// Get current user profile
const getMe = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId).select('name email phone alternateEmail');
        if (!user) return res.json({ success: false, message: "User not found" });
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update current user profile
const updateMe = async (req, res) => {
    try {
        const { userId, name, phone, alternateEmail } = req.body;
        if (alternateEmail && !validator.isEmail(alternateEmail, { require_tld: false })) {
            return res.json({ success: false, message: 'Alternate email is not valid' });
        }
        const update = {};
        if (typeof name !== 'undefined' && name.trim().length >= 2) update.name = name.trim();
        if (typeof phone !== 'undefined') update.phone = phone;
        if (typeof alternateEmail !== 'undefined') update.alternateEmail = alternateEmail;

        const user = await userModel.findByIdAndUpdate(userId, update, { new: true }).select('name email phone alternateEmail');
        if (!user) return res.json({ success: false, message: "User not found" });
        res.json({ success: true, user, message: 'Profile updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Direct name change (no OTP required)
const initNameChange = async (req, res) => {
    try {
        const { userId, newName } = req.body;
        if (!newName || newName.trim().length < 2) {
            return res.json({ success: false, message: 'Please provide a valid name' });
        }
        const user = await userModel.findByIdAndUpdate(userId, { name: newName.trim() }, { new: true }).select('name email phone alternateEmail');
        if (!user) return res.json({ success: false, message: 'User not found' });
        res.json({ success: true, user, message: 'Name updated successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Direct name change verify (no OTP required)
const verifyNameChange = async (req, res) => {
    try {
        const { userId, newName } = req.body;
        if (!newName || newName.trim().length < 2) {
            return res.json({ success: false, message: 'Please provide a valid name' });
        }
        const user = await userModel.findByIdAndUpdate(userId, { name: newName.trim() }, { new: true }).select('name email phone alternateEmail');
        if (!user) return res.json({ success: false, message: 'User not found' });
        res.json({ success: true, user, message: 'Name updated successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { 
    loginUser, 
    registerUser, 
    registerUserInit, 
    adminLogin, 
    getMe, 
    updateMe, 
    initNameChange, 
    verifyNameChange 
};