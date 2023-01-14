import Product from '../../types/Product';
import dateHelper from '../dateHelper';
import ProductHelper from './ProductHelper';
import { v4 as uuidv4 } from 'uuid';

type Result = 'success' | 'conflict' | 'error';

type CartActionResult = {
	cartItems: Array<Product> | null;
	status: Result;
};

export default class CartHelper {
	static productIsInCart(cartItems: Array<Product>, newItemId: string) {
		const result = Boolean(
			cartItems.find((item: { _id: string }) => item._id === newItemId)
		);

		console.log('p in cart?', result);
		return result;
	}

	static productHasConflictingDate(
		cartItems: Array<Product>,
		product: Product
	) {
		if (!this.productIsInCart(cartItems, product._id)) return false;

		const existingProduct = cartItems.find(
			(item: { _id: string }) => item._id === product._id
		);

		return dateHelper.dateRangesOverlap(
			{
				startDate: existingProduct.dateOut,
				endDate: existingProduct.dateDue,
			},
			{
				startDate: product.dateOut,
				endDate: product.dateDue,
			}
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
			result.cartItems = [...cartItems, { ...product, uuid: uuidv4() }];
			result.status = 'success';
		}

		return result;
	}

	/**
	 * @todo allow for purchases from multiple sellers in the future
	 */
	static productCanBeAddedToCart(
		cartItems: Array<Product>,
		product: Product
	): boolean {
		console.log('product compare', cartItems, product);
		if (cartItems.length && product.user !== cartItems[0].user)
			return false;
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
			return (
				a +
				ProductHelper.getProductTotalPrice(c.price, {
					startDate: c.dateOut,
					endDate: c.dateDue,
				})
			);
		}, 0);

		console.log('total cart:', totalPrice);

		return totalPrice;
	}
}
