import mongoose from 'mongoose';

const productImageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    path: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    keyword: { type: String },
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

const ProductImage =
  mongoose.models['ProductImage'] ||
  mongoose.model('ProductImage', productImageSchema);
export default ProductImage;
