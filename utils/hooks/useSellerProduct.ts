import useSWR from 'swr';
import { fetcher } from './fetcher';

export default function useSellerProduct(id: String) {
	const { data, error, isLoading, mutate } = useSWR(
		`/api/sellerProducts/${id}`,
		fetcher
	);

	console.log('useSP', data, error, isLoading);

	return {
		product: data,
		isLoading,
		isError: error,
		mutate, // Used to trigger refresh
	};
}
