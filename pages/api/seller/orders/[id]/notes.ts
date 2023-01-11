import nc from 'next-connect';
import OrderNote from '../../../../../models/OrderNote';
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
		const sellerOwnsOrder = await OrderNote.sellerOwnsOrder(
			req.user._id,
			req.query.id
		);

		console.log('s owns o rdre?', sellerOwnsOrder);

		if (!sellerOwnsOrder) throw new Error('order not found');

		// @ts-ignore
		const orderNotes = await OrderNote.find({ orderId: req.query.id });

		console.log('got order notes', orderNotes);

		await db.disconnect();

		res.send(orderNotes);
	} catch (error) {
		await db.disconnect();

		res.status(404).send({ message: 'order not found' });
	}
});

handler.post(async (req, res) => {
	try {
		await db.connect();

		// @ts-ignore
		const sellerOwnsOrder = await OrderNote.sellerOwnsOrder(
			req.user._id,
			req.query.id
		);

		console.log('s owns o rdre?', sellerOwnsOrder);

		if (!sellerOwnsOrder) throw new Error('order not found');

		const orderNote = new OrderNote({
			orderId: req.body.orderId,
			note: req.body.note,
		});

		await orderNote.save();

		await db.disconnect();

		res.status(201).send(orderNote);
	} catch (error) {
		await db.disconnect();

		res.status(400).json({ success: false, message: error.message });
	}
});

export default handler;
