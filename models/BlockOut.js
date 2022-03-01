import mongoose from 'mongoose';

const blockOutSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SellerProduct',
      required: true,
    },
    count: { type: Number, default: 1 },
    dateOut: { type: Date },
    dateIn: { type: Date },
    details: { type: String },
  },
  {
    timestamps: true,
  }
);

/**
 * Methods
 */

/**
 * Statics
 */

const BlockOut =
  mongoose.models['BlockOut'] || mongoose.model('BlockOut', blockOutSchema);
export default BlockOut;
