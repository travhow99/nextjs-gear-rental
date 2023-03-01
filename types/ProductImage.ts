import Product from './Product';

type ProductImage = {
	id?: string;
	productId: string;
	path: string;
	category?: string;
	description?: string;
	keyword?: string;
};

export default ProductImage;
