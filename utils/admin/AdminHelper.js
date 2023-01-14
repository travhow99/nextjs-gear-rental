import axios from 'axios';
import { useContext } from 'react';

export default class AdminHelper {
  static async fetchOrders() {
    /* const { state, dispatch } = useContext(AdminStore);
    try {
      const { data } = await axios.get('/api/admin/orders');
      console.log('got orders', data);
      dispatch({ type: 'FETCH_SUCCESS', action: 'orders', payload: data });
    } catch (error) {
      console.log('fetch erro', error);
      dispatch({ type: 'FETCH_FAIL' });
    } */
  }
}
