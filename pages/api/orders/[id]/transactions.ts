import nc from 'next-connect';
import OrderTransaction from '../../../../models/OrderTransaction';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';
import { sellerOwnsOrder } from '../../../../utils/helpers/api/SellerOrderHelper';
import { isSeller } from '../../../../utils/isSeller';

const handler = nc({
	onError,
});

handler.use(isSeller);

handler.get(async (req, res) => {
	try {
		await db.connect();

		// @ts-ignore
		const ownsOrder = await sellerOwnsOrder(req.user.id, req.query.id);

		console.log('s owns o rdre?', ownsOrder);

		if (!ownsOrder) throw new Error('order not found');

		// @ts-ignore
		const orderTransactions = await OrderTransaction.find({
			orderId: req.query.id,
		});

		console.log('got order notes', orderTransactions);

		await db.disconnect();

		res.send(orderTransactions);
	} catch (error) {
		await db.disconnect();

		res.status(404).send({ message: 'order not found' });
	}
});

handler.post(async (req, res) => {
	try {
		await db.connect();

		const ownsOrder = await sellerOwnsOrder(req.user.id, req.query.id);

		console.log('s owns o rdre?', ownsOrder);

		if (!ownsOrder) throw new Error('order not found');

		const orderTransaction = new OrderTransaction({
			orderId: req.query.id,
			transactionId: req.body.transactionId,
			type: req.body.type,
			note: req.body.note,
		});

		await orderTransaction.save();

		await db.disconnect();

		res.status(201).send(orderTransaction);
	} catch (error) {
		await db.disconnect();

		res.status(400).json({ success: false, message: error.message });
	}
});

export default handler;
