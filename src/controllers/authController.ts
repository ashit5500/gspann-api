import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import dotenv from 'dotenv';
import { generateToken } from '../services/authService';

dotenv.config();

// const generateToken = (user: IUser) => {
//   return jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
// };

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'Registration successfully, Please login'});
  } catch (error) {
    console.log("error", error)
    res.status(400).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(200).json({
      message: 'Login successful',
      accessToken: generateToken(user)
    }
    );
  } catch (error) {
    console.log("login error",error);
    res.status(400).json({ error: 'Login failed' });
  }
};
