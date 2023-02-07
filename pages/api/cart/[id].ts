import nextConnect from 'next-connect';
import { onError } from '../../../utils/error';
import { authCheck } from '../../../utils/authCheck';
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../types/User';
import CartItem from '../../../types/CartItem';
import Cart from '../../../types/Cart';

const handler = nextConnect({
	onError,
});

handler.use(authCheck);

type ResponseData = {
	success?: Boolean;
	message?: string;
};

interface CartDataType {
	userId?: String;
	cartItems: {
		create: Array<CartItem>;
	};
}

type NextApiRequestWithUser = NextApiRequest & { user?: User };

handler.get(
	async (
		req: NextApiRequestWithUser,
		res: NextApiResponse<ResponseData | Cart>
	) => {
		try {
			const { cartItems }: { cartItems: Array<CartItem> } = req.body;

			const cartData = {
				userId: null,
				cartItems: { create: cartItems },
			};

			if (req.user) cartData.userId = req.user._id;

			const cart = await prisma.cart.findFirst({
				where: {
					id: req.body.id,
				},
				include: {
					cartItems: true,
				},
			});

			res.status(200).send(cart);
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	}
);

handler.put(
	async (
		req: NextApiRequestWithUser,
		res: NextApiResponse<ResponseData | Cart>
	) => {
		try {
			const { cartItems }: { cartItems: Array<CartItem> } = req.body;

			const cartData = {
				userId: null,
				cartItems: { create: cartItems },
			};

			if (req.user) cartData.userId = req.user._id;

			const cart = await prisma.cart.update({
				where: {
					id: req.body.id,
				},
				data: req.body,
			});

			res.status(200).send(cart);
		} catch (error) {
			res.status(404).json({ success: false, message: 'Cart not found' });
		}
	}
);

handler.delete(
	async (
		req: NextApiRequestWithUser,
		res: NextApiResponse<ResponseData | Cart>
	) => {
		try {
			const cart = await prisma.cart.delete({
				where: {
					id: req.body.id,
				},
			});

			res.status(202).send({ success: true, message: 'Cart deleted' });
		} catch (error) {
			res.status(404).json({ success: false, message: 'Cart not found' });
		}
	}
);
