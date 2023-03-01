import useSWR from 'swr';
import SellerProduct from '../../types/SellerProduct';
import { fetcher } from './fetcher';

interface SWRDataResponse {
	product: SellerProduct;
	isLoading: boolean;
	isValidating: boolean;
	isError: boolean;
	mutate?: Function;
}

export default function useSellerProduct(id: String): SWRDataResponse {
	const { data, error, isLoading, isValidating, mutate } = useSWR(
		`/api/sellerProducts/${id}`,
		fetcher
	);

	console.log('useSP', data, error, isLoading);

	return {
		product: data,
		isLoading,
		isValidating,
		isError: error,
		mutate, // Used to trigger refresh
	};
}
