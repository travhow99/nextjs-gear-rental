type Order = {
	_id?: string;
	user: string;
	storeId: string;
	rentals: Array<any>;
	paymentMethod: string;
	paymentResult: string;
	itemsPrice: number;
	taxPrice: number;
	totalPrice: number;
	isPaid: boolean;
	paidAt: Date;
};

export default Order;
