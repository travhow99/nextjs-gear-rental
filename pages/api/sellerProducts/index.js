import nc from 'next-connect';
import SellerProduct from '../../../models/SellerProduct';
import ProductImage from '../../../models/ProductImage';
import BlockOut from '../../../models/BlockOut';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import { isSeller } from '../../../utils/isSeller';
import prisma from '../../../lib/prisma';

const handler = nc({
	onError,
});

handler.use(isSeller);

handler.get(async (req, res) => {
	try {
		await db.connect();

		const products = await SellerProduct.find({
			user_id: req.user.id,
			softDelete: { $ne: true },
		}).populate([
			'images',
			// 'rentals',
			{
				path: 'blockOuts',
				match: { softDelete: { $ne: true } }, // Filter the softDeletes from view
			},
		]);

		await db.disconnect();
		res.status(200).send(products);
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

handler.post(async (req, res) => {
	/* await db.connect();

	const sellerProduct = new SellerProduct({
		...req.body,
		user: req.user.id,
	});

	const product = await sellerProduct.save();

	await db.disconnect(); */

	const product = await prisma.sellerProduct.create({
		data: {
			...req.body,
			userId: req.user.id,
		},
	});

	console.log('created prod:', product);

	res.status(201).send(product);
});

export default handler;
