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
    return total;
  }

  static determineTax(subtotal, taxRate) {
    return subtotal * taxRate;
  }

  static determineTotal(subtotal, tax) {
    return subtotal + tax;
  }
}
