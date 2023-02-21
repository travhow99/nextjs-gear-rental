import Product from './Product';

type ProductImage = {
	productId: Product;
	path: string;
	category?: string;
	description?: string;
	keyword?: string;
};

export default ProductImage;
