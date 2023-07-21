import nc from 'next-connect';
import { onError } from '../../../utils/error';
import { isSeller } from '../../../utils/isSeller';
import prisma from '../../../lib/prisma';

const handler = nc({
	onError,
});

handler.use(isSeller);

handler.get(async (req, res) => {
	try {
		const products = await prisma.sellerProduct.findMany({
			where: {
				userId: req.user.id,
				OR: [{ softDelete: false }, { softDelete: null }],
			},
			include: {
				images: true,
				blockOuts: {
					where: {
						OR: [{ softDelete: false }, { softDelete: null }],
					},
				},
			},
		});

		res.status(200).send(products);
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

handler.post(async (req, res) => {
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
