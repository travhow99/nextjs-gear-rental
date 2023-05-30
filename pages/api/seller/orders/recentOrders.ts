import { addDays } from 'date-fns';
import nc from 'next-connect';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';
import { isSeller } from '../../../../utils/isSeller';
import prisma from '../../../../lib/prisma';

const handler = nc({
	onError,
});

handler.use(isSeller);

handler.get(async (req, res) => {
	try {
		const orders = await prisma.order.findMany({
			where: {
				storeId: req.user.id,
				createdAt: {
					gte: addDays(new Date(), -2),
				},
			},
		});

		res.send(orders.length);
	} catch (error) {
		console.log('err', error);
		res.status(404).send({ message: 'access denied' });
	}
});

export default handler;
