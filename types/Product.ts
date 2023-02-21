import ProductImage from './ProductImage';

/**
 * @deprecated
 */
type Product = {
	_id: string;
	product: string;
	user?: any;
	uuid?: any;
	stock: number;
	category: string;
	rentalMin: number;
	title: string;
	brand: string;
	gender: string;
	size: string;
	condition: string;
	price: number;
	description: string;
	keyword: string;
	slug: string;
	images: Array<ProductImage>;
	rentals: Array<object>;
	rental?: {
		startDate: string;
		endDate: string;
	};
	dateOut?: string;
	dateDue?: string;
	blockOuts: Array<object>;
};

export default Product;
