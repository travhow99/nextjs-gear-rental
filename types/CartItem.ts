import SellerProduct from './SellerProduct';

type CartItem = {
	id?: string;
	cartId?: string;
	productId: string;
	product?: SellerProduct;
	startDate: Date;
	endDate: Date;

	createdAt?: Date;
	updatedAt?: Date;
};

export default CartItem;
