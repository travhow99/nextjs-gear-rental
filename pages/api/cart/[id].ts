import nextConnect from 'next-connect';
import { onError } from '../../../utils/error';
import { authCheck } from '../../../utils/authCheck';
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import NextApiRequestWithUser from '../../../types/api/NextApiRequestWithUser';
import CartItem from '../../../types/CartItem';
import { cartItemIsValid } from '../../../utils/helpers/api/CartHelper';
import { Prisma } from '@prisma/client';

const handler = nextConnect({
	onError,
});

handler.use(authCheck);

type ResponseData = {
	success?: Boolean;
	message?: string;
};

handler.get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
	try {
		const cartId = String(req.query.id);

		let cart = await prisma.cart.findFirst({
			where: {
				id: cartId,
			},
			include: {
				cartItems: {
					include: {
						product: {
							include: {
								images: true,
							},
						},
					},
				},
			},
		});

		// console.log('loop thru cartitems?');
		if (cart?.cartItems?.length) {
			for await (const cartItem of cart.cartItems) {
				if (!cartItemIsValid(cartItem)) {
					// @todo remove from cart
					// console.log('INVALID ITEM!!!');

					cart = await prisma.cart.update({
						where: {
							id: cartId,
						},
						data: {
							cartItems: {
								deleteMany: [{ id: cartItem.id }],
							},
						},
						include: {
							cartItems: {
								include: {
									product: {
										include: {
											images: true,
										},
									},
								},
							},
						},
					});
				}
			}
		}

		res.status(200).send(cart);
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

handler.put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
	try {
		const cartId = String(req.query.id);
		const { cartItems }: { cartItems: CartItem } = req.body;

		const cartData = {
			userId: null,
			cartItems: { create: cartItems },
		};

		if (req.user) cartData.userId = req.user.id;

		const cart = await prisma.cart.update({
			where: {
				id: cartId,
			},
			data: {
				cartItems: { create: req.body.cartItem },
			},
			include: { cartItems: true },
		});

		res.status(200).send(cart);
	} catch (error) {
		res.status(404).json({ success: false, message: 'Cart not found' });
	}
});

handler.delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
	try {
		const cartId = String(req.query.id);

		const cart = await prisma.cart.update({
			where: {
				id: cartId,
			},
			data: {
				cartItems: { deleteMany: [{ id: req.body.id }] },
			},
		});

		res.status(202).send({
			success: true,
			message: 'CartItem deleted',
		});
	} catch (error) {
		res.status(404).json({ success: false, message: 'Cart not found' });
	}
});

export default handler;
