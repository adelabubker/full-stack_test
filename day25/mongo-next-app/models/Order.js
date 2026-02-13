import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    product: { type: String, required: true },
    amount: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
