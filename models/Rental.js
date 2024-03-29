import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'SellerProduct',
		},
		quantity: { type: Number, default: 0, required: true },
		dateOut: { type: Date },
		dateDue: { type: Date },
		dateReturned: { type: Date },
		price: { type: Number },
		details: { type: String },
		softDelete: { type: Boolean, default: false },
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
	mongoose?.models['Rental'] || mongoose.model('Rental', rentalSchema);

export default Rental;
