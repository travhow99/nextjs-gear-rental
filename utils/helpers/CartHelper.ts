import Product from '../../types/Product';
import dateHelper from '../dateHelper';
import ProductHelper from './ProductHelper';

type Result = 'success' | 'conflict' | 'error';

type CartActionResult = {
	cartItems: Array<Product> | null;
	status: Result;
};

export default class CartHelper {
	static productIsInCart(cartItems: Array<Product>, newItemId: string) {
		return Boolean(
			cartItems.find((item: { _id: string }) => item._id === newItemId)
		);
	}

	static productHasConflictingDate(
		cartItems: Array<Product>,
		product: Product
	) {
		if (!this.productIsInCart(cartItems, product._id)) return false;

		const existingProduct = cartItems.find(
			(item: { _id: string }) => item._id === product._id
		);

		console.log('exst product', existingProduct.rental, product.rental);

		return dateHelper.dateRangesOverlap(
			existingProduct.rental,
			product.rental
		);
	}

	static addProductToCart(
		cartItems: Array<Product>,
		product: Product
	): CartActionResult {
		console.log(
			'add2cart ',
			cartItems,
			this.productHasConflictingDate(cartItems, product)
		);
		const result: CartActionResult = {
			cartItems: null,
			status: 'error',
		};

		if (
			this.productIsInCart(cartItems, product._id) &&
			this.productHasConflictingDate(cartItems, product)
		) {
			result.cartItems = cartItems;
			result.status = 'conflict';
		} else {
			result.cartItems = [...cartItems, product];
			result.status = 'success';
		}

		return result;
	}

	static productCanBeAddedToCart(
		cartItems: Array<Product>,
		product: Product
	): boolean {
		if (
			this.productIsInCart(cartItems, product._id) &&
			this.productHasConflictingDate(cartItems, product)
		) {
			return false;
		}

		return true;
	}

	static getCartTotalPrice(cartItems: Array<Product>) {
		const totalPrice = cartItems.reduce((a, c) => {
			console.log('a:', a);
			console.log(ProductHelper.getProductTotalPrice(c.price, c.rental));
			return a + ProductHelper.getProductTotalPrice(c.price, c.rental);
		}, 0);

		console.log('total cart:', totalPrice);

		return totalPrice;
	}
}
