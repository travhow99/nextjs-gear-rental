import mongoose, { Schema } from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const sellerProductSchema = new mongoose.Schema(
	{
		//   id: { type: String, required: true },
		product: {
			type: String,
			required: true,
		} /* { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } */,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		// slug: { type: String, required: true },
		stock: { type: Number, default: 0 },
		category: { type: String, required: true },
		rentalMin: { type: Number, required: true },
		title: { type: String, required: true },
		brand: { type: String, required: true },
		gender: { type: String, default: null },
		size: { type: String, default: null },
		condition: { type: String, default: null },
		price: { type: Number, required: true },
		// rating: { type: Number, required: true, default: 0 },
		description: { type: String },
		keyword: { type: String },
		slug: { type: String, slug: ['title', 'brand'], unique: true },
		images: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'ProductImage',
			},
		],
		rentals: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Rental',
			},
		],
		blockOuts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'BlockOut',
			},
		],
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
sellerProductSchema.statics.sellerOwnsProduct =
	async function sellerOwnsProduct(userId, productId) {
		console.log('STATIC SOWNSP', productId, userId);
		const userOwnsProduct = await SellerProduct.exists({
			_id: productId,
			user: userId,
		});

		console.log('STATIC SOWNSP RES', userOwnsProduct);

		return userOwnsProduct;
	};

const SellerProduct =
	mongoose?.models['SellerProduct'] ||
	mongoose.model('SellerProduct', sellerProductSchema);

export default SellerProduct;
