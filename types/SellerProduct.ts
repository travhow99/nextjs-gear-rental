import { BlockOut } from '@prisma/client';
import ProductImage from './ProductImage';
import Rental from './Rental';

type SellerProduct = {
	id?: string;
	brand: string;
	category: string;
	condition?: string;
	description: string;
	gender?: string;
	images: Array<ProductImage>;
	imageUrl?: string; // future featured image url property
	keyword?: string;
	price: number;
	product: string;
	rentalMin: number;
	size?: string;
	slug: string;
	softDelete?: boolean;
	stock: number;
	title: string;
	userId: string;
	blockOuts: Array<BlockOut>;
	rentals: Array<Rental>;
	rating?: number;
	reviewCount?: number;
	createdAt?: Date;
	updatedAt?: Date;
};

export default SellerProduct;
