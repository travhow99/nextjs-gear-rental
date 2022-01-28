import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();
const initialState = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  /* cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],
    shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress'))
      : {},
    paymentMethod: Cookies.get('paymentMethod')
      ? Cookies.get('paymentMethod')
      : {},
  }, */
  requestLoading: true,
  requestFor: '',
  order: {},
  orders: [],
  requestError: '',
  payLoading: false,
  paySuccess: false,
  payError: '',
  user: {},
};

function reducer(state, action) {
  console.log('reducer action', action);
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };
    /* case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      console.log('recd cart_add_item', action.payload);
      const itemAlreadyExists = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

      console.log('existing item?', itemAlreadyExists);

      const cartItems = itemAlreadyExists
        ? state.cart.cartItems.map((item) =>
            item.title === itemAlreadyExists.title ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      console.log('updating cart', cartItems);

      Cookies.set('cartItems', JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      Cookies.set('cartItems', JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_CLEAR': {
      Cookies.remove('cartItems');

      return { ...state, cart: { ...state.cart, cartItems: [] } };
    } */
    case 'SAVE_SHIPPING_ADDRESS': {
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    }
    case 'SAVE_PAYMENT_METHOD': {
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    }
    /**
     * Request Handling
     */
    case 'FETCH_REQUEST':
      return {
        ...state,
        requestLoading: true,
        requestFor: action.payload.requestFor,
        requestError: '',
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        requestLoading: false,
        [action.action]: action.payload,
        // requestFor: null,
        requestError: '',
      };
    case 'FETCH_FAIL':
      return {
        ...state,
        payLoading: false,
        payError: action.payload,
        // requestFor: null,
      };
    /**
     * Payment Handling
     */
    case 'PAY_REQUEST':
      return { ...state, payLoading: true };
    case 'PAY_SUCCESS':
      return {
        ...state,
        payLoading: false,
        payError: '',
        paySuccess: true,
      };
    case 'PAY_FAIL':
      return { ...state, payLoading: false, payError: action.payload };
    case 'PAY_RESET':
      return { ...state, payLoading: false, paySuccess: false, payError: '' };
    case 'USER_LOGIN':
      return { ...state, user: action.payload };
    case 'USER_LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  console.log('state!!', state);
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
