import { Prisma } from '@prisma/client';
import ProductImage from './ProductImage';
import Rental from './Rental';

const sellerProductWithImages = Prisma.validator<Prisma.SellerProductArgs>()({
	include: {
		images: true,
	},
});

type SellerProductWithImages = Prisma.SellerProductGetPayload<
	typeof sellerProductWithImages
>;

export default SellerProductWithImages;
