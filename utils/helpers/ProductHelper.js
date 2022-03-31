// const _product = { determineSubtotal };

import DateHelper from '../DateHelper';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getMonth, isAfter, isBefore, isSameDay, setMonth } from 'date-fns';

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

  /**
   * Fetch the calendar for a specific SellerProduct
   * @param {String} id product_id
   * @param {Int} month a month to fetch future calendar dates for
   * @returns data from calendar API
   */
  static fetchCalendar = async (id, month = null) => {
    let endpoint = `/api/sellerProducts/${id}/calendar`;

    if (month) endpoint += `/${month}`;
    const { data } = await axios.get(endpoint);

    return data;
  };

  /**
   * Build an array of Calendar data for a specific SellerProduct
   * @param {Object} data data object returned from
   * @returns Array of merged BlockOut & Rental data
   */
  static buildCalendar = (data) => {
    const blockOuts = data.blockOuts.map((bo) => {
      return { out: bo.dateOut, in: bo.dateIn, type: 'blockOut' };
    });

    const rentals = data.rentals.map((bo) => {
      return { out: bo.dateOut, in: bo.dateDue, type: 'rental' };
    });

    return [...blockOuts, ...rentals];
  };

  /**
   * Check if a specific date is booked
   * @param {Array} bookings
   * @param {Date} date
   * @param {String} type blockOut|rental|null
   * @returns {Boolean} isBooked
   */
  static getIsBooked = (bookings = [], date, type = null) => {
    if (!bookings.length) return false;

    let isBooked = false;

    if (type) {
      bookings = bookings.filter((booking) => booking.type === type);
    }

    bookings.map((b) => {
      const start = new Date(b.out);
      const end = new Date(b.in);
      const isBetween = isAfter(date, start) && isBefore(date, end);

      if (isBetween || isSameDay(date, start) || isSameDay(date, end)) {
        isBooked = true;
      }
    });

    return isBooked;
  };

  static getBookingType = (bookings = [], date, type = null) => {
    if (!bookings.length) return false;

    let bookingType = null;

    if (type) {
      bookings = bookings.filter((booking) => booking.type === type);
    }

    bookings.map((b) => {
      const start = new Date(b.out);
      const end = new Date(b.in);
      const isBetween = isAfter(date, start) && isBefore(date, end);

      if (isBetween || isSameDay(date, start) || isSameDay(date, end)) {
        bookingType = b.type;
      }
    });

    console.log('got booking type', bookingType);
    return bookingType;
  };

  static getFutureMonth = (month) => {
    const future = new Date(month);
    return setMonth(future, getMonth(future) + 3);
  };
}
