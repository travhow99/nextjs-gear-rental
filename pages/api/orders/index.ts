import { NextApiResponse } from 'next';
import nc from 'next-connect';
import prisma from '../../../lib/prisma';
import Order from '../../../models/Order';
// import Rental from '../../../models/Rental';
import SellerProduct from '../../../models/SellerProduct';
import NextApiRequestWithUser from '../../../types/api/NextApiRequestWithUser';
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

/**
 * @todo
 */
handler.post(async (req, res) => {
	try {
		// const order = await prisma.order.create({});

		await db.connect();

		console.log('got request', req.body);

		return;
		const rentals = req.body.orderItems.map((rental: Rental) => {
			rental.product = rental.id;
			delete rental.id;
			delete rental.createdAt;
			delete rental.updatedAt;
			return rental;
		});

		console.log('r:', rentals);

		// Add the Rentals to the db
		const result = await Rental.insertMany(rentals);

		console.log('got insertedids', result);

		const newOrder = new Order({
			...req.body,
			user: req.user._id,
			storeId: rentals[0].user,
			rentals: result.map((rental) => rental._id),
		});
		console.log('store new order', newOrder);
		const order = await newOrder.save();

		// Store rentals to SellerProduct
		result.map(async (rental) => {
			// const ObjectId = require('mongoose').Types.ObjectId;

			// const productId = new ObjectId(rental.product);
			const productId = rental.product;
			const sellerProduct = await SellerProduct.findById(productId);

			sellerProduct.rentals.push(rental);

			await sellerProduct.save();
		});

		await db.disconnect();

		res.status(201).send(order);
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

export default handler;
