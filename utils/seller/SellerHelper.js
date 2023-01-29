import axios from 'axios';
import { useContext } from 'react';
import useOrder from '../hooks/useOrder';
import { generateAccessToken } from './paypalHelper';
import { v4 as uuidv4 } from 'uuid';

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
			// Check order status
			const { data: order } = await axios.get(`/api/orders/${id}`);

			if (
				order.paymentResult &&
				order.paymentResult.status === 'COMPLETED'
			) {
				const { id: transactionId, status } =
					await this.refundPaypalOrder(order.paymentResult.id);

				await this.storeOrderTransactionInfo(
					id,
					transactionId,
					'refund'
				);
			}

			const { data } = await axios.delete(`/api/orders/${id}`);

			console.log('got archiveOrder', data);
		} catch (error) {
			console.log('fetch err', error);
			throw error;
		}
	};

	static refundPaypalOrder = async (captureId) => {
		console.log('attempting refund');
		const baseUrl = `https://api-m.sandbox.paypal.com`;
		const url = baseUrl + `/v2/payments/captures/${captureId}/refund`;

		try {
			const accessToken = await generateAccessToken();

			const { data } = await axios.post(
				url,
				{},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
						'PayPal-Request-Id': uuidv4(),
					},
				}
			);

			/**
			 * @todo store refund details in db
			 */

			console.log('refundPaypal:', data);

			return data;

			/* type paypalRefund {
				id: string;
				status: String;
				links: Array<any>
			} */
		} catch (error) {
			console.log('fetch err', error);
			throw error;
		}
	};

	/**
	 *
	 * @param {string} orderId
	 * @param {string} transactionId Paypal transactionId
	 * @param {string} type 'purchase' | 'refund'
	 * @param {string} note
	 */
	static storeOrderTransactionInfo = async (
		orderId,
		transactionId,
		type,
		note = null
	) => {
		try {
			const { data } = await axios.post(
				`/api/orders/${orderId}/transaction`,
				{
					transactionId,
					type,
					note,
				}
			);

			console.log('storeOrderTransactionInfo', data);
		} catch (error) {
			console.log('storeOrderTransactionInfo err', error);
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
