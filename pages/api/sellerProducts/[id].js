import nc from 'next-connect';
import SellerProduct from '../../../models/SellerProduct';
import Order from '../../../models/Order';
import ProductImage from '../../../models/ProductImage';
import User from '../../../models/User';
import BlockOut from '../../../models/BlockOut';
import Rental from '../../../models/Rental';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import { isSeller } from '../../../utils/isSeller';

const handler = nc({
	onError,
});

handler.use(isSeller);

handler.get(async (req, res) => {
	try {
		await db.connect();

		const sellerOwnsProduct = await SellerProduct.sellerOwnsProduct(
			req.user._id,
			req.query.id
		);

		if (Boolean(sellerOwnsProduct)) {
			const sellerproduct = await SellerProduct.findById(
				req.query.id
			).populate([
				'images',
				{
					path: 'rentals',
					populate: {
						path: 'user',
						model: User,
						select: 'name email',
					},
				},
				{
					path: 'blockOuts',
					match: { softDelete: { $ne: true } }, // Filter the softDeletes from view
				},
			]);

			// Casted to object to allow for data manipulation
			const sellerProductObject = sellerproduct.toObject();

			await Promise.all(
				sellerproduct.rentals.map(async (r, index) => {
					try {
						const rentalId = await Order.findOne({
							rentals: r._id,
						});

						sellerProductObject.rentals[index].orderId =
							rentalId._id;
					} catch (error) {
						console.log('caought err:', error);
					}
				})
			);

			await db.disconnect();

			res.send(sellerProductObject);
		} else {
			await db.disconnect();

			res.status(404).send({ message: 'product not found' });
		}
	} catch (error) {
		console.log('err', error);
		res.status(404).send({ message: 'product not found' });
	}
});

handler.put(async (req, res) => {
	try {
		await db.connect();

		const sellerOwnsProduct = await SellerProduct.sellerOwnsProduct(
			req.user._id,
			req.query.id
		);

		if (Boolean(sellerOwnsProduct)) {
			SellerProduct.findByIdAndUpdate(req.query.id, req.body, {
				new: true,
			})
				.populate([
					'images',
					'rentals',
					{
						path: 'blockOuts',
						match: { softDelete: { $ne: true } }, // Filter the softDeletes from view
					},
				])
				.exec(async (err, result) => {
					await db.disconnect();

					if (err) {
						console.log('err', err);
						res.status(404).send({ message: 'product not found' });
					} else {
						res.send({ message: 'product updated', result });
					}
				});
		} else {
			await db.disconnect();

			res.status(404).send({ message: 'product not found' });
		}
	} catch (error) {
		console.log('err', error);
		res.status(404).send({ message: 'product not found' });
	}
});

export default handler;
