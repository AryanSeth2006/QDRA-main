// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User,{ IUser } from '../models/User'; // Adjust the path according to your project structure

export interface AuthRequest extends Request {
  user?: IUser;
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied, no token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id); // Adjust according to your user model and method to find a user
    if (!user) return res.status(404).json({ message: 'User not found.' });

    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
