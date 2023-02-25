import axios from 'axios';
import useSWR from 'swr';
import Order from '../../types/Order';
import { fetcher } from './fetcher';

interface SWRDataResponse {
	orders: Array<Order>;
	isLoading: boolean;
	isValidating: boolean;
	isError: boolean;
	mutate?: Function;
}

export default function useUserOrders(): SWRDataResponse {
	const { data, error, isLoading, isValidating, mutate } = useSWR(
		`/api/orders`,
		fetcher
	);

	return {
		orders: data,
		isLoading,
		isValidating,
		isError: error,
		mutate, // Used to trigger refresh
	};
}
