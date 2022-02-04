import mongoose from 'mongoose';

const blockOutSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },
    date_out: { type: Date },
    date_in: { type: Date },
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
