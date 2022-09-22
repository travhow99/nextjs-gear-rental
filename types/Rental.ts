import Product from './Product';
import User from './User';

type Rental = {
	user: User;
	product: Product;
	quantity?: Number;
	dateOut: string;
	dateDue: string;
	dateReturned?: string;
	price: Number;
	details?: string;
	softeDelete?: Boolean;
};

export default Rental;
