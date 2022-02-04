import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
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

const Category =
  mongoose.models['Category'] || mongoose.model('Category', categorySchema);
export default Category;
