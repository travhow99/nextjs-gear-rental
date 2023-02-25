import SellerProduct from './SellerProduct';
import User from './User';

type Rental = {
	id?: string;
	orderId?: string;
	user: User;
	product: SellerProduct | string;
	quantity?: Number;
	dateOut: Date;
	dateDue: Date;
	dateReturned?: Date;
	price: Number;
	details?: string;
	softeDelete?: Boolean;
};

export default Rental;
