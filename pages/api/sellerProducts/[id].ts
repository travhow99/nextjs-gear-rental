import nc from 'next-connect';
import SellerProduct from '../../../models/SellerProduct';
import Order from '../../../models/Order';
import ProductImage from '../../../models/ProductImage';
import User from '../../../models/User';
import BlockOut from '../../../models/BlockOut';
import Rental from '../../../models/Rental';
import { onError } from '../../../utils/error';
import { isSeller } from '../../../utils/isSeller';
import prisma from '../../../lib/prisma';
import { sellerOwnsProduct } from '../../../utils/helpers/api/SellerProductHelper';

const handler = nc({
	onError,
});

handler.use(isSeller);

handler.get(async (req, res) => {
	try {
		const ownsProduct = await sellerOwnsProduct(req.user.id, req.query.id);

		console.log('got OP', ownsProduct);

		if (ownsProduct) {
			const sellerProductObject = await prisma.sellerProduct.findUnique({
				where: {
					id: req.query.id,
				},
				include: {
					images: true,
					user: {
						select: {
							id: true,
							name: true,
						},
					},
					blockOuts: true,
					rentals: true,
				},
			});

			res.send(sellerProductObject);
		} else {
			throw new Error('product not found');
		}
	} catch (error) {
		console.log('err', error);
		console.error(error);
		// await prisma.$disconnect();

		res.status(404).send({ message: 'product not found' });
	}
});

handler.put(async (req, res) => {
	try {
		const ownsProduct = await sellerOwnsProduct(req.user.id, req.query.id);

		console.log('got OP', ownsProduct);

		if (ownsProduct) {
			const sellerProductObject = await prisma.sellerProduct.update({
				where: {
					id: req.query.id,
				},
				data: req.body,
			});

			res.send(sellerProductObject);
		} else {
			throw new Error('product not found');
		}
	} catch (error) {
		console.log('err', error);
		console.error(error);
		// await prisma.$disconnect();

		res.status(404).send({ message: 'product not found' });
	}
});

handler.delete(async (req, res) => {
	try {
		const ownsProduct = await sellerOwnsProduct(req.user.id, req.query.id);

		if (ownsProduct) {
			const r = await prisma.sellerProduct.update({
				where: {
					id: req.query.id,
				},
				data: {
					softDelete: true,
				},
			});

			console.log('owns p,', r);

			res.send({ message: 'product deleted' });
		} else {
			throw new Error('product not found');
		}
	} catch (error) {
		console.log('err', error);
		res.status(404).send({ message: 'product not found' });
	}
});

export default handler;
