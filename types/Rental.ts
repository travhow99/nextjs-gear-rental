import SellerProduct from './SellerProduct';
import User from './User';

type Rental = {
	id?: string;
	orderId?: string;
	user?: User;
	userId: string;
	// product: SellerProduct | string;
	sellerProduct?: SellerProduct;
	sellerProductId: string;
	quantity?: Number;
	dateOut: Date;
	dateDue: Date;
	dateReturned?: Date;
	price: Number;
	details?: string;
	softeDelete?: Boolean;
	createdAt?: Date;
	updatedAt?: Date;
};

export default Rental;
