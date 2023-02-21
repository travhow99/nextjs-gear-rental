import axios from 'axios';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import Cart from '../../../types/Cart';
import CartItem from '../../../types/CartItem';
import SellerProduct from '../../../types/SellerProduct';
import dateHelper from '../../dateHelper';

/**
 * Add a product to the user's cart, by either creating a cart or modifying the current cart.
 */
export async function addProductToCart(
	product: CartItem,
	cart?: Cart
): Promise<Cart> {
	// try {
	if (cart) {
		if (!productCanBeAddedToCart(cart.cartItems, product)) {
			throw new Error('Product already exists in cart');
		}

		// Add to exiting cart
		const { data: updatedCart } = await axios.put(`/api/cart/${cart.id}`, {
			cartItem: product,
		});

		console.log('got cart updated:', updatedCart);

		return updatedCart;
	} else {
		// Create new cart
		const { data: cart } = await axios.post('/api/cart', {
			cartItem: product,
		});

		console.log('got cart created:', cart);

		return cart;
	}
	/* } catch (error) {
		console.log('addProductToCart error:', error);
		// return error;
		throw new Error(error);
	} */
}

export async function removeItemFromCart(
	cartItemId: CartItem['id']
): Promise<Cart | void> {
	// Remove from exiting cart
	const { data: cart } = await axios.delete(`/api/cartItem/${cartItemId}`);

	console.log('got cart item removed:', cart);

	return cart;
}

export function productExistsInCart(
	cartItems: Array<CartItem>,
	productId: SellerProduct['id']
): boolean {
	return Boolean(
		cartItems.find((cartItem) => cartItem.productId === productId)
	);
}

export function getExistingProductsFromCart(
	cartItems: Array<CartItem>,
	productId: SellerProduct['id']
): CartItem[] {
	return cartItems.filter((cartItem) => cartItem.productId === productId);
}

export function productHasConflictingDate(
	cartItems: Array<CartItem>,
	product: CartItem
) {
	if (!productExistsInCart(cartItems, product.productId)) return false;

	const existingProducts = getExistingProductsFromCart(
		cartItems,
		product.productId
	);

	console.log('exist?', existingProducts, 'current produ', product);

	let hasConflict = false;

	existingProducts.forEach((existingProduct) => {
		if (
			dateHelper.dateRangesOverlap(
				{ startDate: product.startDate, endDate: product.endDate },
				{
					startDate: existingProduct.startDate,
					endDate: existingProduct.endDate,
				}
			)
		) {
			hasConflict = true;
		}
	});

	return hasConflict;
}

export function productCanBeAddedToCart(
	cartItems: Array<CartItem>,
	product: CartItem
): boolean {
	const today = new Date();
	console.log(new Date(product.startDate), new Date(product.endDate), today);
	const startDate = new Date(product.startDate);
	const endDate = new Date(product.endDate);
	if (
		(isBefore(startDate, today) && !isSameDay(startDate, today)) ||
		(isBefore(endDate, today) && !isSameDay(endDate, today))
	) {
		console.log('b4');
		return false;
	}

	const productDoesExist = productExistsInCart(cartItems, product.productId);
	console.log('productDoesExist', productDoesExist, cartItems, product);
	if (!productDoesExist) return true;

	const productHasConflict = productHasConflictingDate(cartItems, product);
	console.log('productHasConflict', productHasConflict);
	return !productHasConflict;
}