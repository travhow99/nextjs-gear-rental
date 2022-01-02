import { createContext, useReducer } from 'react';

export const Request = createContext();
const initialState = {
  loading: true,
  order: {},
  error: '',
};
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function RequestProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  console.log('request state?', state);
  return <Request.Provider value={value}>{props.children}</Request.Provider>;
}
