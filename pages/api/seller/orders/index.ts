import { NextApiResponse } from 'next';
import nc from 'next-connect';
import prisma from '../../../../lib/prisma';
import NextApiRequestWithUser from '../../../../types/api/NextApiRequestWithUser';
import { isAdmin } from '../../../../utils/Admin';
import { onError } from '../../../../utils/error';

const handler = nc({
	onError,
});

handler.use(isAdmin);

handler.get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
	try {
		const orders = await prisma.order.findMany({
			where: {
				storeId: req.user.id,
			},
			select: {
				isPaid: true,
				totalPrice: true,
				id: true,
				createdAt: true,
				softDelete: true,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		});

		res.send(orders);
	} catch (error) {
		res.status(404).send({ message: 'access denied' });
	}
});

export default handler;
