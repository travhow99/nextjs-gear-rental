import Rental from './Rental';
import User from './User';

type Order = {
	_id?: String;
	user: User;
	storeId: String;
	rentals: Array<Rental>;
	paymentMethod: String;
	paymentResult: String;
	itemsPrice: Number;
	taxPrice: Number;
	totalPrice: Number;
	isPaid: Boolean;
	paidAt?: Date;
	createdAt: Date;
};

export default Order;
