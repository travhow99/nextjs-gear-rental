import nc from 'next-connect';
import prisma from '../../../../../lib/prisma';
import { onError } from '../../../../../utils/error';
import { isSeller } from '../../../../../utils/isSeller';
import { sellerOwnsOrder } from '../../../../../utils/helpers/api/SellerOrderHelper';

const handler = nc({
	onError,
});

handler.use(isSeller);

handler.get(async (req, res) => {
	try {
		const ownsOrder = await sellerOwnsOrder(req.user.id, req.query.id);

		if (!ownsOrder) throw new Error('order not found');

		const order = await prisma.order.findFirst({
			where: {
				id: req.query.id,
			},
			include: {
				rentals: {
					include: {
						sellerProduct: {
							include: {
								images: true,
							},
						},
					},
				},
				user: {
					select: {
						name: true,
						email: true,
					},
				},
				orderTransactions: true,
			},
		});

		res.send(order);
	} catch (error) {
		res.status(404).send({ message: 'order not found' });
	}
});

/**
 * @todo soft delete should use delete method, this needs to be updated to modify the existing order
 */
handler.put(async (req, res) => {
	try {
		const ownsOrder = await sellerOwnsOrder(req.user.id, req.query.id);

		if (!ownsOrder) throw new Error('order not found');

		const order = await prisma.order.update({
			where: {
				id: req.query.id,
			},
			data: {
				softDelete: true,
			},
		});

		res.status(200).send(order);
	} catch (error) {
		res.status(404).send({ message: 'order not found' });
	}
});

export default handler;
