import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  username: string;
  transactionId: string;
}

const transactionSchema = new Schema({
  username: { type: String, required: false },
  transactionId: { type: String, required: true },
});

export default mongoose.model<ITransaction>('Transaction', transactionSchema);
