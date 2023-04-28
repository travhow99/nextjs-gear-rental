import { Prisma } from '@prisma/client';

const orderWithAllRelations = Prisma.validator<Prisma.OrderArgs>()({
	include: {
		rentals: {
			include: {
				sellerProduct: {
					include: {
						images: true,
					},
				},
			},
		},
		user: {
			select: {
				name: true,
				email: true,
			},
		},
		orderTransactions: true,
	},
});

type OrderWithAllRelations = Prisma.OrderGetPayload<
	typeof orderWithAllRelations
>;

export default OrderWithAllRelations;
