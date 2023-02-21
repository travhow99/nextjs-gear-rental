import nextConnect from 'next-connect';
import { onError } from '../../../utils/error';
import { authCheck } from '../../../utils/authCheck';
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../types/User';
import { Cart, CartItem, SellerProduct } from '@prisma/client';

const handler = nextConnect({
	onError,
});

handler.use(authCheck);

type ResponseData = {
	success?: Boolean;
	message?: string;
};

type NextApiRequestWithUser = NextApiRequest & { user?: User };

handler.get(
	async (
		req: NextApiRequestWithUser,
		res: NextApiResponse<ResponseData | CartItem>
	) => {
		try {
			const cartItemId = String(req.query.id);

			const cartItem = await prisma.cartItem.findFirst({
				where: {
					id: cartItemId,
				},
				include: {
					product: {
						include: {
							images: true,
						},
					},
				},
			});

			res.status(200).send(cartItem);
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	}
);

handler.put(
	async (
		req: NextApiRequestWithUser,
		res: NextApiResponse /* <ResponseData | Cart> */
	) => {
		try {
			const cartItemId = String(req.query.id);

			const cartItem = await prisma.cartItem.update({
				where: {
					id: cartItemId,
				},
				data: req.body.cartItem,
				include: {
					product: {
						include: {
							images: true,
						},
					},
				},
			});

			res.status(200).send(cartItem);
		} catch (error) {
			res.status(404).json({
				success: false,
				message: 'CartItem not found',
			});
		}
	}
);

handler.delete(
	async (
		req: NextApiRequestWithUser,
		res: NextApiResponse /* <ResponseData | Cart> */
	) => {
		try {
			const cartItemId = String(req.query.id);

			const cartItem = await prisma.cartItem.delete({
				where: {
					id: cartItemId,
				},
			});

			res.status(202).send({
				success: true,
				message: 'CartItem deleted',
			});
		} catch (error) {
			res.status(404).json({
				success: false,
				message: 'CartItem not found',
			});
		}
	}
);

export default handler;
