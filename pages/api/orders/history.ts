import { NextApiResponse } from 'next';
import nc from 'next-connect';
import prisma from '../../../client';
import Order from '../../../models/Order';
import ProductImage from '../../../models/ProductImage';
import Rental from '../../../models/Rental';
import NextApiRequestWithUser from '../../../types/api/NextApiRequestWithUser';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
	onError,
});

handler.use(isAuth);

handler.get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
	try {
		const orders = await prisma.order.findMany({
			where: {
				userId: req.user.id,
			},
			include: {
				rentals: true,
			},
		});

		res.send(orders);
	} catch (error) {}
});

export default handler;
