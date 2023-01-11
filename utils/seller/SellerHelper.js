import axios from 'axios';
import { useContext } from 'react';

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
	 * @todo Turn into hooks
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
	 * @todo Should also refund the order
	 * @param {string} id Order _id
	 */
	static archiveOrder = async (id) => {
		try {
			const { data } = await axios.delete(`/api/orders/${id}`);

			console.log('got archiveOrder', data);
		} catch (error) {
			console.log('fetch err', error);
			throw error;
		}
	};

	/**
	 * Store a seller note for an order.
	 * @param {string} orderId Order ID
	 * @param {string} note
	 */
	static addOrderNote = async (orderId, note) => {
		try {
			const { data } = await axios.post(
				`/api/seller/orders/${orderId}/notes`,
				{
					orderId,
					note,
				}
			);
		} catch (error) {
			console.log('fetch err', error);
			throw error;
		}
	};
}
