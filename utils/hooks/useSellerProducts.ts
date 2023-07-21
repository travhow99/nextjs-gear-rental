import axios from 'axios';
import useSWR from 'swr';
import { fetcher } from './fetcher';
import SellerProductWithAllRelations from '../../types/SellerProduct';

interface SWRDataResponse {
	products: Array<SellerProductWithAllRelations>;
	isLoading: boolean;
	isValidating: boolean;
	isError: boolean;
	mutate?: Function;
}

export default function useSellerProducts(): SWRDataResponse {
	const { data, error, isLoading, isValidating, mutate } = useSWR(
		`/api/sellerProducts`,
		fetcher
	);

	return {
		products: data,
		isLoading,
		isError: error,
		mutate, // Used to trigger refresh
		isValidating,
	};
}
