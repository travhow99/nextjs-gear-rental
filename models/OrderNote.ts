import { Document, model, models, Schema, Types } from 'mongoose';
import Order from './Order';

interface IOrderNote extends Document {
	orderId: Types.ObjectId;
	note: string;
}

const orderNoteSchema = new Schema<IOrderNote>(
	{
		orderId: {
			type: Schema.Types.ObjectId,
			ref: 'Order',
		},
		note: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

// const OrderNote = model<IOrderNote>('OrderNote', OrderNoteSchema);

/**
 * Methods
 */

/**
 * Statics
 */
orderNoteSchema.statics.sellerOwnsOrder = async function sellerOwnsOrder(
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

const OrderNote =
	models['OrderNote'] || model<IOrderNote>('OrderNote', orderNoteSchema);

export default OrderNote;
