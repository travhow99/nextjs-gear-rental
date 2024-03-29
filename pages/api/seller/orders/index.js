import nc from 'next-connect';
import Order from '../../../../models/Order';
import ProductImage from '../../../../models/ProductImage';
import { isAdmin } from '../../../../utils/Admin';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';

const handler = nc({
	onError,
});

handler.use(isAdmin);

handler.get(async (req, res) => {
	await db.connect();

	const orders = await Order.find({ storeId: req.user._id })
		.select('isPaid totalPrice _id createdAt softDelete')
		.sort({ updatedAt: -1 });

	await db.disconnect();
	res.send(orders);
});

export default handler;
