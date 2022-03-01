import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SellerProduct',
      },
    ],
    dateOut: { type: Date },
    dateDue: { type: Date },
    dateReturned: { type: Date },
    amountDue: { type: Number, required: true },
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
