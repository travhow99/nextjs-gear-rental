import nc from 'next-connect';
import prisma from '../../../../../lib/prisma';
import OrderNote from '../../../../../models/OrderNote';
import db from '../../../../../utils/db';
import { onError } from '../../../../../utils/error';
import { sellerOwnsOrder } from '../../../../../utils/helpers/api/SellerOrderHelper';
import { isSeller } from '../../../../../utils/isSeller';

const handler = nc({
	onError,
});

handler.use(isSeller);

handler.get(async (req, res) => {
	try {
		const ownsOrder = await sellerOwnsOrder(req.user.id, req.query.id);

		console.log('s owns o rdre?', ownsOrder);

		if (!ownsOrder) throw new Error('order not found');

		const orderNotes = await prisma.orderNote.findMany({
			where: {
				orderId: req.query.id,
			},
		});

		console.log('got order notes', orderNotes);

		res.send(orderNotes);
	} catch (error) {
		await db.disconnect();

		res.status(404).send({ message: 'order not found' });
	}
});

handler.post(async (req, res) => {
	try {
		const ownsOrder = await sellerOwnsOrder(req.user.id, req.query.id);

		console.log('s owns o rdre?', ownsOrder);

		if (!ownsOrder) throw new Error('order not found');

		const orderNote = await prisma.orderNote.create({
			data: {
				orderId: req.body.id,
				note: req.body.note,
			},
		});

		res.status(201).send(orderNote);
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

export default handler;
