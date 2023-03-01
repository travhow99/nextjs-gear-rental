import nextConnect from 'next-connect';
import { onError } from '../../../utils/error';
import { authCheck } from '../../../utils/authCheck';
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../types/User';
import CartItem from '../../../types/CartItem';

const handler = nextConnect({
	onError,
});

handler.use(authCheck);

interface CartDataType {
	userId: any;
	cartItems: {
		create: CartItem;
	};
}

type NextApiRequestWithUser = NextApiRequest & { user?: User };

handler.post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
	try {
		const { cartItem }: { cartItem: CartItem } = req.body;

		const cartData = {
			userId: null,
			cartItems: { create: cartItem },
		};

		console.log('cd:', cartData, cartItem);

		if (req.user) cartData.userId = req.user.id;

		const cart = await prisma.cart.create({
			data: {
				userId: req.user?.id || null,
				cartItems: {
					create: [cartItem],
				},
			},
			include: { cartItems: true },
		});

		res.status(201).send(cart);
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

export default handler;
