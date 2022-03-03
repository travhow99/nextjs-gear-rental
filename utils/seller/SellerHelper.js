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
}
