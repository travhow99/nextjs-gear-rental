import Rental from './Rental';
import User from './User';

type Order = {
	_id?: string;
	user: User;
	storeId: string;
	rentals: Array<Rental>;
	paymentMethod: string;
	paymentResult: string;
	itemsPrice: number;
	taxPrice: number;
	totalPrice: number;
	isPaid: boolean;
	paidAt?: Date;
	createdAt: Date;
	softDelete?: Boolean;
};

export default Order;
