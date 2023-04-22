import { Prisma } from '@prisma/client';

const rental = Prisma.validator<Prisma.RentalArgs>()({
	include: {
		user: true,
		sellerProduct: {
			include: {
				images: true,
			},
		},
	},
});

type RentalWithUser = Prisma.RentalGetPayload<typeof rental>;

export default RentalWithUser;
