import { Document, model, models, Schema, Types } from 'mongoose';
import Order from './Order';

type TransactionType = 'purchase' | 'refund';

interface IOrderTransaction extends Document {
	orderId: Types.ObjectId;
	transactionId: string;
	type: TransactionType;
	note?: string;
}

const orderTransactionSchema = new Schema<IOrderTransaction>(
	{
		orderId: {
			type: Schema.Types.ObjectId,
			ref: 'Order',
		},
		transactionId: {
			type: String,
			required: true,
		},
		type: { type: String, required: true },
		note: { type: String, required: false },
	},
	{
		timestamps: true,
	}
);

// const OrderTransaction = model<IOrderTransaction>('OrderTransaction', OrderTransactionSchema);

/**
 * Methods
 */

/**
 * Statics
 */
orderTransactionSchema.statics.sellerOwnsOrder = async function sellerOwnsOrder(
	userId,
	saleId
) {
	//@ts-ignore
	const userOwnsOrder = await Order.exists({
		_id: saleId,
		user: userId,
	});

	return Boolean(userOwnsOrder);
};

const OrderTransaction =
	models['OrderTransaction'] ||
	model<IOrderTransaction>('OrderTransaction', orderTransactionSchema);

export default OrderTransaction;
