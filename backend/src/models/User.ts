// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  coins: number;
  referralClicks: number;
  invitedFriends: number;
  referralSignUps: number;
  followedPlatforms: {
    twitter: boolean;
    facebook: boolean;
    instagram: boolean;
    youtube: boolean;
  };
  transactions: {
    transactionId: string;
    date: Date;
  }[];
}

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  coins: { type: Number, default: 0 },
  referralClicks: { type: Number, default: 0 },
  invitedFriends: { type: Number, default: 0 },
  referralSignUps: { type: Number, default: 0 },
  followedPlatforms: {
    twitter: { type: Boolean, default: false },
    facebook: { type: Boolean, default: false },
    instagram: { type: Boolean, default: false },
    youtube: { type: Boolean, default: false },
  },
  transactions: [
    {
      transactionId: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model<IUser>('User', userSchema);
