import { Document, Model, models, model, Schema, Types } from 'mongoose';

interface IOrder extends Document {
	user: Types.ObjectId;
	storeId: Types.ObjectId;
	rentals: Array<Types.ObjectId>;
	paymentMethod: string;
	paymentResult?: {
		id: string;
		status: string;
		email_address: string;
	};
	itemsPrice: Number;
	taxPrice: Number;
	totalPrice: Number;
	isPaid: Boolean;
	paidAt?: Date;
	softDelete?: Boolean;
}

const orderSchema: Schema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		storeId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		rentals: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Rental',
			},
		],
		paymentMethod: { type: String, required: true },
		paymentResult: { id: String, status: String, email_address: String },
		itemsPrice: { type: Number, required: true },
		taxPrice: { type: Number, required: true },
		totalPrice: { type: Number, required: true },
		isPaid: { type: Boolean, required: true, default: false },
		paidAt: { type: Date },
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

const Order = models['Order'] || model<IOrder>('Order', orderSchema);

export default Order;
