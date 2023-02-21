import { useSelector } from 'react-redux';
import useSWR from 'swr';
import Cart from '../../types/Cart';
import { fetcher } from './fetcher';

interface SWRDataResponse {
	cart: Cart;
	isLoading: boolean;
	isValidating: boolean;
	isError: boolean;
	mutate?: Function;
}

interface RootState {
	cart: String | null;
}

export default function useCart(): SWRDataResponse {
	const { cart } = useSelector((state: RootState) => state);

	const id = cart;

	const { data, error, isLoading, isValidating, mutate } = useSWR(
		id ? `/api/cart/${id}` : null, // Pass null to prevent request
		fetcher
	);

	return {
		cart: data,
		isLoading,
		isValidating,
		isError: error,
		mutate, // Used to trigger refresh
	};
}
