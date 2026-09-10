import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//Generate JWT
const generateToken = (res, payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });
  return token;
};


// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
if(!name || !email || !password) {
      return res.json({ message: 'Please fill all the fields', success: false });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: 'User already exists', success: false });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    // Generate message
    return res.json({ message: 'User registered successfully', success: true });

  } catch (error) {
    console.log(error.message);
    return res.json({ message: 'Server error', success: false });
  }
};

//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.json({ message: 'Please fill all the fields', success: false });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: 'User not found', success: false });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.json({ message: 'Invalid credentials', success: false });
    }

    // Generate Token
    generateToken(res, { id: user._id,role:user.isAdmin?"admin":"user" });

    // Send response
    return res.json({ message: 'User logged in successfully', 
        success: true, 
        user: { 
            name: user.name, 
            email: user.email} 
        });
  }catch (error) {
    console.log(error.message);
    return res.json({ message: 'Server error', success: false });
  }
};

//admin login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.json({ message: 'Please fill all the fields', success: false });  
        }
        // Check if admin credentials match
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (email !== adminEmail || password !== adminPassword) {
            return res.json({ message: 'Invalid admin credentials', success: false });
        }

        // Generate Token
        const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'1d'
        });

        res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      return res.json({ message: 'Admin logged in successfully', success: true });

    }catch (error) {
     console.log(error.message);
    return res.json({ message: 'Server error', success: false });
  }
};

//user logout
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({ message: 'User logged out successfully', success: true });
    } catch (error) {
        console.log(error.message);
        return res.json({ message: 'Server error', success: false });
    }
};



export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
          return res.status(404).json({ message: 'User not found', success: false });
        }
        return res.json({ user, success: true });

    } catch (error) {
        console.log(error.message);
        return res.json({ message: 'Server error', success: false });
    }
  }