type CartItem = {
	_id?: string;
	cartId: string;
	productId: string;
	startDate: Date;
	endDate: Date;

	createdAt?: Date;
	updatedAt?: Date;
};

export default CartItem;
