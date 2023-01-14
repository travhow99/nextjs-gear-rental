import axios from 'axios';
import useSWR from 'swr';
import { fetcher } from './fetcher';

export default function useSellerProducts() {
	const { data, error, isLoading, mutate } = useSWR(
		`/api/sellerProducts`,
		fetcher
	);

	return {
		products: data,
		isLoading,
		isError: error,
		mutate, // Used to trigger refresh
	};
}
