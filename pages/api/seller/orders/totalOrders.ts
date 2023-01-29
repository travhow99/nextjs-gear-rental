import nc from 'next-connect';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';
import { isSeller } from '../../../../utils/isSeller';

const handler = nc({
	onError,
});

handler.use(isSeller);

handler.get(async (req, res) => {
	try {
		await db.connect();

		// @todo TS error
		// @ts-ignore
		const orders = await Order.find({ storeId: req.user._id }).lean();

		await db.disconnect();

		res.send(orders.length);
	} catch (error) {
		await db.disconnect();

		console.log('err', error);
		res.status(404).send({ message: 'access denied' });
	}
});

export default handler;
