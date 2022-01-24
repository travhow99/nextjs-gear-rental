import { createContext, useReducer } from 'react';

export const AdminStore = createContext();
const initialState = {
  requestError: '',
  requestLoading: true,
  requestFor: '',
  orders: [],
};

function reducer(state, action) {
  switch (action.type) {
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

    default:
      break;
  }
}
export function AdminStoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  console.log('state!!', state);
  return (
    <AdminStore.Provider value={value}>{props.children}</AdminStore.Provider>
  );
}