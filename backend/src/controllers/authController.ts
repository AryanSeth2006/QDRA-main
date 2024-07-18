// src/controllers/authController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import shortid from 'shortid';

const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const { referrerId } = req.query; // Extract referrerId from query parameters

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate referral code
    const referralCode = shortid.generate();

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      referralCode,
    });

    await newUser.save();

    // Handle referral logic
    if (referrerId) {
      const referrer = await User.findById(referrerId);
      if (referrer) {
        referrer.referralSignUps += 1;

        // Reward coins based on the number of successful referrals
        let coinsToAdd = 0;
        if (referrer.referralSignUps >= 10) {
          coinsToAdd = 100000;
        } else if (referrer.referralSignUps >= 5) {
          coinsToAdd = 50000;
        } else if (referrer.referralSignUps >= 2) {
          coinsToAdd = 20000;
        }
        referrer.coins += coinsToAdd;
        await referrer.save();
      } else {
        console.error('Referrer not found:', referrerId);
      }
    }

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.status(201).json({ result: newUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export { registerUser, loginUser };
