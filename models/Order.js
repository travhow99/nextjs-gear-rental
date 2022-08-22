import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		rentals: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Rental',
			},
		],
		/* shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    }, */
		paymentMethod: { type: String, required: true },
		paymentResult: { id: String, status: String, email_address: String },
		itemsPrice: { type: Number, required: true },
		taxPrice: { type: Number, required: true },
		totalPrice: { type: Number, required: true },
		isPaid: { type: Boolean, required: true, default: false },
		// isDelivered: { type: Boolean, required: true, default: false },
		paidAt: { type: Date },
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

const Order = mongoose?.models['Order'] || mongoose.model('Order', orderSchema);
export default Order;
