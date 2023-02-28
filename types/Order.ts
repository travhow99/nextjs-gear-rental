import OrderTransaction from './OrderTransaction';
import Rental from './Rental';
import User from './User';

type Order = {
	id?: string;
	user: User;
	storeId: string;
	rentals: Array<Rental>;
	paymentMethod: string;
	paymentResult: {
		id: string;
		status: string;
		email_address: string;
	};
	itemsPrice: number;
	taxPrice: number;
	totalPrice: number;
	isPaid: boolean;
	paidAt?: Date;
	orderTransactions?: Array<OrderTransaction>;
	createdAt: Date;
	softDelete?: Boolean;
};

export default Order;
