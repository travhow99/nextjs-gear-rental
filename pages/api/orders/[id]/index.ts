import { NextApiResponse } from 'next';
import nc from 'next-connect';
import prisma from '../../../../lib/prisma';
import Order from '../../../../models/Order';
import NextApiRequestWithUser from '../../../../types/api/NextApiRequestWithUser';
import { isAuth } from '../../../../utils/auth';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';

const handler = nc({
	onError,
});

handler.use(isAuth);

handler.get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
	try {
		const order = await prisma.order.findFirst({
			where: {
				id: String(req.query.id),
				userId: req.user.id,
			},
			include: {
				orderNotes: true,
				orderTransactions: true,
				rentals: {
					include: {
						sellerProduct: {
							include: {
								images: true,
							},
						},
					},
				},
			},
		});

		console.log('got order:', order);

		res.send(order);
	} catch (error) {
		res.status(404).send({ message: 'order not found' });
	}
});

handler.delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
	try {
		const result = await prisma.order.updateMany({
			where: {
				id: String(req.query.id),
				userId: req.user.id,
			},
			data: {
				softDelete: true,
			},
		});

		res.send({ message: 'order deleted', result });
	} catch (error) {
		console.log('delete err', error);
		res.status(404).send({ message: 'order not found' });
	}
});

export default handler;
