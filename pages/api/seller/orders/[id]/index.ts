import nc from 'next-connect';
import Order from '../../../../../models/Order';
import ProductImage from '../../../../../models/ProductImage';
import Rental from '../../../../../models/Rental';
import SellerProduct from '../../../../../models/SellerProduct';
import User from '../../../../../models/User';
import db from '../../../../../utils/db';
import { onError } from '../../../../../utils/error';
import { isSeller } from '../../../../../utils/isSeller';

const handler = nc({
	onError,
});

handler.use(isSeller);

handler.get(async (req, res) => {
	try {
		await db.connect();
		// @ts-ignore
		const order = await Order.findById(req.query.id)
			.populate([
				{
					path: 'rentals',
					model: Rental,
					populate: {
						path: 'product',
						model: SellerProduct,
						populate: {
							path: 'images',
							model: ProductImage,
						},
					},
				},
				{
					path: 'user',
					model: User,
					select: 'name email',
				},
			])
			.lean();

		await db.disconnect();

		res.send(order);
	} catch (error) {
		await db.disconnect();

		res.status(404).send({ message: 'order not found' });
	}
});

handler.put(async (req, res) => {
	try {
		await db.connect();

		// @ts-ignore
		const result = await Order.findByIdAndUpdate(req.query.id, {
			softDelete: true,
		});

		await db.disconnect();
	} catch (error) {
		await db.disconnect();

		res.status(404).send({ message: 'order not found' });
	}
});

export default handler;
