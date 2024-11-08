import { generateTokenAndSetCookie } from "../libs/utils/generateToken.js";
import User from "../models/userModel.js"
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format!" });
        }
        if(!name || !email || !password) {
            return res.status(400).json({error: "Please provide all details"});
        }
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            res.status(400).json({ error: "Email already taken!" });
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (password.length < 8) {
            res.status(400).json({ error: "Password must be atleast 8 characters long!" });
        }
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Password must include uppercase, lowercase, number, and special character!" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPswd = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashPswd,
            // role: role.toLowerCase(),
        });
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                message: "User created successfully!",
                user: {id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role},
                // token: newUser.token
            });
        } else {
            res.json({ error: "Please try again later!" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server error! " + error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return res.status(404).json({ message: "Invalid email or password!" });
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            name: user.name,
            email: user.email,
            id: user._id
        });
        // res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "User logout successfully!" });

    } catch (error) {
        res.status(500).json({ error: "Internal server error! " + error.message });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: "Internal server error! "+error.message});
    }
}

export const getStudentInfo = async (req, res) => {
    try {
        const {id} = req.params;
        const studentInfo = await User.findById(id).select("-password");
        res.status(200).json(studentInfo);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}