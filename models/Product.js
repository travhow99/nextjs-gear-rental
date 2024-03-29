import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    //   id: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true } /** @todo store many images */,
    imageAlt: { type: String, required: true },
    stock: { type: Number, default: 0 },
    category: { type: String, required: true },
    rental_min: { type: Number, required: true },
    title: { type: String, required: true },
    brand: { type: String, required: true },
    gender: { type: String, default: null },
    size: { type: String, default: null },
    price: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
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
productSchema.statics.determinePrice = function determinePrice(
  item,
  quantity,
  cb
) {
  return this.where('_id', item._id).exec(cb);
};

const Product =
  mongoose?.models['Product'] || mongoose.model('Product', productSchema);
export default Product;
