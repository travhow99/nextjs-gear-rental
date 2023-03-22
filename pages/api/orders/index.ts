import { NextApiResponse } from 'next';
import nc from 'next-connect';
import prisma from '../../../lib/prisma';
import Order from '../../../models/Order';
// import Rental from '../../../models/Rental';
import SellerProduct from '../../../models/SellerProduct';
import NextApiRequestWithUser from '../../../types/api/NextApiRequestWithUser';
import CartItem from '../../../types/CartItem';
import Rental from '../../../types/Rental';
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
	} catch (error) {
		res.status(404).send({ message: 'orders not found' });
	}
});

handler.post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
	try {
		const rentals = req.body.orderItems.map(
			(orderItem: CartItem): Rental => {
				return {
					userId: req.user.id,
					sellerProductId: orderItem.productId,
					dateOut: orderItem.startDate,
					dateDue: orderItem.endDate,
					price: orderItem.product.price,
					quantity: 1,
				};
			}
		);

		const order = await prisma.order.create({
			data: {
				userId: req.user.id,
				storeId: req.body.orderItems[0].product.userId,
				rentals: {
					createMany: {
						data: [...rentals],
					},
				},
				paymentMethod: req.body.paymentMethod,
				itemsPrice: parseFloat(req.body.itemsPrice),
				taxPrice: parseFloat(req.body.taxPrice),
				totalPrice: parseFloat(req.body.totalPrice),
			},
			include: {
				rentals: true,
			},
		});

		res.status(201).send(order);
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

export default handler;
