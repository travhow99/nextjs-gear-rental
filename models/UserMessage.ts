import { Document, model, models, Schema, Types } from 'mongoose';

interface IUserMessage extends Document {
	sentBy: Types.ObjectId;
	sentTo: Types.ObjectId;
	product: Types.ObjectId;
	message: string;
	// Stored by default timestamps
	// sentAt?: Date;
	readAt?: Date;
}

const userMessageSchema = new Schema<IUserMessage>(
	{
		sentBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		sentTo: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		product: {
			type: Schema.Types.ObjectId,
			ref: 'SellerProduct',
		},
		message: { type: String, required: true },
		readAt: { type: Date },
	},
	{
		timestamps: true,
	}
);

// const UserMessage = model<IUserMessage>('UserMessage', userMessageSchema);

/**
 * Methods
 */

/**
 * Statics
 */
export default models['UserMessage'] ||
	model<IUserMessage>('UserMessage', userMessageSchema);
