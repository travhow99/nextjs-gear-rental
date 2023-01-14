import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema(
  {
    //   id: { type: String, required: true },
    title: { type: String, required: true },
    logoUrl: { type: String, required: true },
    url: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
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

const Brand = mongoose?.models['Brand'] || mongoose.model('Brand', brandSchema);
export default Brand;
