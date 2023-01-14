import nc from 'next-connect';
import Order from '../../../models/Order';
import ProductImage from '../../../models/ProductImage';
import Rental from '../../../models/Rental';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
	onError,
});

handler.use(isAuth);

handler.get(async (req, res) => {
	await db.connect();
	const orders = await Order.find({ user: req.user._id }).populate({
		path: 'rentals',
		model: Rental,
		populate: {
			path: 'product',
			populate: {
				path: 'images',
				model: ProductImage,
			},
		},
	});

	await db.disconnect();
	res.send(orders);
});

export default handler;
