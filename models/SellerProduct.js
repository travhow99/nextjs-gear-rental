import mongoose from 'mongoose';

const sellerProductSchema = new mongoose.Schema(
  {
    //   id: { type: String, required: true },
    product: {
      type: String,
      required: true,
    } /* { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } */,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    slug: { type: String, required: true, unique: true },
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
    description: { type: String, required: true },
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

const SellerProduct =
  mongoose.models['SellerProduct'] ||
  mongoose.model('SellerProduct', sellerProductSchema);
export default SellerProduct;
