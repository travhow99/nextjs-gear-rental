import nc from 'next-connect';
import SellerProduct from '../../../models/SellerProduct';
import ProductImage from '../../../models/ProductImage';
import Rental from '../../../models/Rental';
import BlockOut from '../../../models/BlockOut';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import { isSeller } from '../../../utils/isSeller';
// import { sellerOwnsProduct } from '../../../utils/middleware/sellerOwnsProduct';

const handler = nc({
	onError,
});

// handler.use(isSeller).use(sellerOwnsProduct);

handler.get(async (req, res) => {
	try {
		await db.connect();

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
	} catch (error) {
		console.log('err', error);
		res.status(404).send({ message: 'product not found' });
	}
});

handler.put(async (req, res) => {
	try {
		await db.connect();

		SellerProduct.findByIdAndUpdate(req.query.id, req.body, { new: true })
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
	} catch (error) {
		console.log('err', error);
		res.status(404).send({ message: 'product not found' });
	}
});

export default handler;
