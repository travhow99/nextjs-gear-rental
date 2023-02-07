import CartItem from './CartItem';

type Cart = {
	_id?: string;
	userId?: string;
	cartItems?: Array<CartItem>;
	createdAt?: Date;
	updatedAt?: Date;
};

export default Cart;
