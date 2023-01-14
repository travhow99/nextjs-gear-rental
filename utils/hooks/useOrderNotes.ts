import useSWR from 'swr';
import OrderNote from '../../types/OrderNote';
import { fetcher } from './fetcher';

interface SWRDataResponse {
	notes: Array<OrderNote>;
	isLoading: boolean;
	isValidating: boolean;
	isError: boolean;
	mutate?: Function;
}

export default function useOrderNotes(id: String): SWRDataResponse {
	const { data, error, isLoading, isValidating, mutate } = useSWR(
		`/api/seller/orders/${id}/notes`,
		fetcher,
		{ revalidateOnFocus: false }
	);

	console.log('useSP', data, error, isLoading, isValidating);

	return {
		notes: data,
		isLoading,
		isValidating,
		isError: error,
		mutate, // Used to trigger refresh
	};
}
