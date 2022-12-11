import Product from './Product';
import User from './User';

type Rental = {
	_id?: string;
	orderId?: string;
	user: User;
	product: Product | string;
	quantity?: Number;
	dateOut: string;
	dateDue: string;
	dateReturned?: string;
	price: Number;
	details?: string;
	softeDelete?: Boolean;
};

export default Rental;
