import mongoose from 'mongoose';

const productImageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // slug: { type: String, required: true },
    stock: { type: Number, default: 0 },
    category: { type: String, required: true },
    rental_min: { type: Number, required: true },
    title: { type: String, required: true },
    brand: { type: String, required: true },
    gender: { type: String, default: null },
    size: { type: String, default: null },
    condition: { type: String, default: null },
    price: { type: Number, required: true },
    // rating: { type: Number, required: true, default: 0 },
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
