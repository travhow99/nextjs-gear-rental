import nc from 'next-connect';
import SellerProduct from '../../../models/SellerProduct';
import ProductImage from '../../../models/ProductImage';
import Rental from '../../../models/Rental';
import BlockOut from '../../../models/BlockOut';
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
				'rentals',
				{
					path: 'blockOuts',
					match: { softDelete: { $ne: true } }, // Filter the softDeletes from view
				},
			]);

			await db.disconnect();

			res.send(sellerproduct);
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
