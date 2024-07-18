import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IReferral extends Document {
  referralCode: string;
  referrer: IUser['_id']; // Reference to User document
  referee: IUser['_id']; // Reference to User document
}

const referralSchema = new Schema<IReferral>({
  referralCode: { type: String, required: true },
  referrer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  referee: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model<IReferral>('Referral', referralSchema);
