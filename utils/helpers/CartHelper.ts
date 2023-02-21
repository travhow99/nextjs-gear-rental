import dateHelper from '../dateHelper';
import ProductHelper from './ProductHelper';
import { v4 as uuidv4 } from 'uuid';
import SellerProduct from '../../types/SellerProduct';
import Cart from '../../types/Cart';
import CartItem from '../../types/CartItem';

type Result = 'success' | 'conflict' | 'error';

type CartActionResult = {
	cartItems: Array<SellerProduct> | null;
	status: Result;
};

export default class CartHelper {
	static productIsInCart(cartItems: Array<SellerProduct>, newItemId: string) {
		const result = Boolean(
			cartItems.find((item: { id: string }) => item.id === newItemId)
		);

		console.log('p in cart?', result);
		return result;
	}

	static productHasConflictingDate(
		cartItems: Array<SellerProduct>,
		product: SellerProduct
	) {
		if (!this.productIsInCart(cartItems, product.id)) return false;

		const existingProduct = cartItems.find(
			(item: { id: string }) => item.id === product.id
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
		cartItems: Array<SellerProduct>,
		product: SellerProduct
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
			this.productIsInCart(cartItems, product.id) &&
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
		cartItems: Array<SellerProduct>,
		product: SellerProduct
	): boolean {
		console.log('product compare', cartItems, product);
		if (cartItems.length && product.user !== cartItems[0].user)
			return false;
		if (
			this.productIsInCart(cartItems, product.id) &&
			this.productHasConflictingDate(cartItems, product)
		) {
			return false;
		}

		return true;
	}

	static getCartTotalPrice(cartItems: Array<CartItem>) {
		console.log('T PRICE:', cartItems);

		const price = cartItems.reduce((a, c) => {
			return (
				a +
				dateHelper.getNumberOfDaysBetween(
					new Date(c.startDate),
					new Date(c.endDate)
				) *
					c.product.price
			);
		}, 0);
		return price;
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
