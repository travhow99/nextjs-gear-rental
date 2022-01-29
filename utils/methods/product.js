// const _product = { determineSubtotal };

import DateHelper from '../DateHelper';

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

  static async addProductToCart(product) {}
}
