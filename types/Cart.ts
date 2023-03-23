/* import CartItem from './CartItem';

type Cart = {
	id?: string;
	userId?: string;
	cartItems?: Array<CartItem>;
	createdAt?: Date;
	updatedAt?: Date;
};

export default Cart; */

import { Prisma } from '@prisma/client';

// 1: Define a type that includes the relation to `Post`
const cartWithCartItems = Prisma.validator<Prisma.CartArgs>()({
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

type CartWithCartItems = Prisma.CartGetPayload<typeof cartWithCartItems>;

export default CartWithCartItems;
