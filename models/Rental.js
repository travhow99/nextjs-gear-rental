import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },
    date_out: { type: Date },
    date_due: { type: Date },
    date_returned: { type: Date },
    amount_due: { type: Number, required: true },
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

const Rental =
  mongoose.models['Rental'] || mongoose.model('Rental', rentalSchema);
export default Rental;
