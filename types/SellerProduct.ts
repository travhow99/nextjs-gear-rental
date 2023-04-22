import { Prisma } from '@prisma/client';
import ProductImage from './ProductImage';
import Rental from './Rental';

const sellerProductWithImages = Prisma.validator<Prisma.SellerProductArgs>()({
	include: {
		images: true,
	},
});

const sellerProductWithAllRelations =
	Prisma.validator<Prisma.SellerProductArgs>()({
		include: {
			images: true,
			user: {
				select: {
					id: true,
					name: true,
				},
			},
			blockOuts: true,
			rentals: true,
		},
	});

export type SellerProductWithImages = Prisma.SellerProductGetPayload<
	typeof sellerProductWithImages
>;

type SellerProductWithAllRelations = Prisma.SellerProductGetPayload<
	typeof sellerProductWithAllRelations
>;

export default SellerProductWithAllRelations;
