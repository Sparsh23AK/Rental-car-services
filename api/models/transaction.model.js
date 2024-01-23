import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  transactionType: { type: String, enum: ['purchase', 'rental'], required: true },
  timestamp: { type: Date, default: Date.now },
  amount: Number
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;