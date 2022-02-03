// const _product = { determineSubtotal };

import DateHelper from '../DateHelper';
import { useDispatch, useSelector } from 'react-redux';

// export default _product;

export default class ProductHelper {
  /**
   * @todo Calculate with # of days for rental
   */
  static determineSubtotal(cartItems) {
    const total = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
    return this.roundToPenny(total);
  }

  static determineTax(subtotal, taxRate) {
    const result = this.roundToPenny(Number(subtotal) * Number(taxRate));
    return String(result);
  }

  static determineTotal(subtotal, tax) {
    const result = this.roundToPenny(Number(subtotal) + Number(tax));
    return String(result);
  }

  /**
   *
   * @param {Float} value
   * @returns {Number} number
   */
  static roundToPenny(value) {
    return Number(value).toFixed(2);
  }

  static formatPurchaseDate(timestamp) {
    return DateHelper.timestampToDate(timestamp);
  }

  static fetchProduct = async (id) => {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  };

  static addProductToCart = async (product) => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state);

    console.log('prod method add to cart', product);
    const existingItem = cart.cartItems.find(
      (item) => item._id === product._id
    );
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    const data = this.fetchProduct(product._id);
    if (data.stock < quantity) {
      alert('OUT OF STOCK');
      return;
    }
    // dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    // router.push('/cart');
  };
}
