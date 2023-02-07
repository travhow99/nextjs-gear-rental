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
	userId?: String;
	cartItems: {
		create: Array<CartItem>;
	};
}

type NextApiRequestWithUser = NextApiRequest & { user?: User };

handler.post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
	try {
		const { cartItems }: { cartItems: Array<CartItem> } = req.body;

		const cartData = {
			userId: null,
			cartItems: { create: cartItems },
		};

		if (req.user) cartData.userId = req.user._id;

		const cart = await prisma.cart.create({
			data: cartData,
		});

		res.status(201).send(cart);
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});
