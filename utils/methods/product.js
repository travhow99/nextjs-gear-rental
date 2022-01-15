// const _product = { determineSubtotal };
// export default _product;
export default class ProductHelper {
  /**
   * @todo Calculate with # of days for rental
   */
  static determineSubtotal(cartItems) {
    console.log(cartItems);
    const total = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
    console.log(total);
    return this.roundToPenny(total);
  }

  static determineTax(subtotal, taxRate) {
    return this.roundToPenny(subtotal * taxRate);
  }

  static determineTotal(subtotal, tax) {
    return this.roundToPenny(subtotal + tax);
  }

  static roundToPenny(value) {
    return Math.round(value * 100) / 100;
  }
}
