import nc from 'next-connect';
import Order from '../../../../models/Order';
import { isAuth } from '../../../../utils/auth';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';

const handler = nc({
	onError,
});

handler.use(isAuth);

handler.get(async (req, res) => {
	await db.connect();
	const order = await Order.findById(req.query.id);

	await db.disconnect();
	res.send(order);
});

handler.delete(async (req, res) => {
	await db.connect();

	try {
		const result = await Order.findByIdAndUpdate(req.query.id, {
			softDelete: true,
		});

		console.log('recd delete', result);

		await db.disconnect();

		res.send({ message: 'order deleted', result });
	} catch (error) {
		await db.disconnect();

		console.log('delete err', error);
		res.status(404).send({ message: 'order not found' });
	}
});

export default handler;
