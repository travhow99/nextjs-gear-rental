import axios from 'axios';
import { useContext } from 'react';
import SellerProduct from '../../models/SellerProduct';

export default class SellerHelper {
	/**
	 * @todo
	 */
	static async fetchOrders() {
		/* const { state, dispatch } = useContext(SellerStore);
    try {
      const { data } = await axios.get('/api/Seller/orders');
      console.log('got orders', data);
      dispatch({ type: 'FETCH_SUCCESS', action: 'orders', payload: data });
    } catch (error) {
      console.log('fetch erro', error);
      dispatch({ type: 'FETCH_FAIL' });
    } */
	}

	/**
	 *
	 * @returns arr brands
	 */
	static fetchBrands = async () => {
		try {
			const { data } = await axios.get('/api/brands');
			console.log('got brands', data);

			return data;
		} catch (error) {
			console.log('fetch err', error);
			throw error;
		}
	};

	static fetchCategories = async () => {
		const { data } = await axios.get('/api/categories');

		console.log('got categories', data);

		return data;
	};

	/**
	 * Archive the order
	 * @todo
	 * @param {string} id Order _id
	 */
	static archiveOrder = async (id) => {};

	/**
	 * Verify the seller owns the SellerProduct.
	 * @param {string} userId User _id
	 * @param {string|string[]} productId SellerProduct _id
	 * @returns {Boolean}
	 */
	static sellerOwnsProduct = async (userId, productId) => {
		/* return await SellerProduct.exists({
			user: userId,
			product: productId,
		}); */

		return false;
	};
}
