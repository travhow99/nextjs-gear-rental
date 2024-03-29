import nc from 'next-connect';
import Order from '../../../../models/Order';
import { isAuth } from '../../../../utils/auth';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';

const handler = nc({
	onError,
});

handler.use(isAuth);

handler.put(async (req, res) => {
	await db.connect();
	const order = await Order.findById(req.query.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			// id: req.body.id,
			id: req.body.purchase_units[0].payments.captures[0].id,
			status: req.body.status,
			email_address: req.body.email_address,
		};

		const paidOrder = await order.save();
		await db.disconnect();
		res.send({ message: 'order paid', order: paidOrder });
	} else {
		await db.disconnect();
		res.status(404).send({ message: 'order not found' });
	}
});

export default handler;
