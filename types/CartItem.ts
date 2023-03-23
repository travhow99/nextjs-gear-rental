import { Prisma } from '@prisma/client';
import SellerProduct from './SellerProduct';
// 1: Define a type that includes the relation to `Post`
const cartItemWithProduct = Prisma.validator<Prisma.CartItemArgs>()({
	include: {
		product: {
			include: {
				images: true,
			},
		},
	},
});

type CartItemWithProduct = Prisma.CartItemGetPayload<
	typeof cartItemWithProduct
>;

export default CartItemWithProduct;

// 2: Define a type that only contains a subset of the scalar fields
/* const userPersonalData = Prisma.validator<Prisma.UserArgs>()({
	select: { email: true, name: true },
}); */

// 3: This type will include a user and all their posts
// type UserWithPosts = Prisma.UserGetPa÷yload<typeof userWithPosts>;

export type UnsavedCartItem = {
	productId: string;
	startDate: Date;
	endDate: Date;
};
