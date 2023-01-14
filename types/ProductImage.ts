import Product from './Product';

type ProductImage = {
	product: Product;
	path: string;
	category?: string;
	description?: string;
	keyword?: string;
};

export default ProductImage;
