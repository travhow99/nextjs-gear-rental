import axios from 'axios';
import useSWR from 'swr';
import Order from '../../types/Order';
import { fetcher } from './fetcher';

interface SWRDataResponse {
	order: Order;
	isLoading: boolean;
	isValidating: boolean;
	isError: boolean;
	mutate?: Function;
}

export default function useUserOrder(id: string): SWRDataResponse {
	const { data, error, isLoading, isValidating, mutate } = useSWR(
		`/api/orders/${id}`,
		fetcher
	);

	return {
		order: data,
		isLoading,
		isValidating,
		isError: error,
		mutate,
	};
}
