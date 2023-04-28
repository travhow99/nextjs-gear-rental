import useSWR from 'swr';
import { fetcher } from './fetcher';
import { OrderTransaction } from '@prisma/client';

interface SWRDataResponse {
	transactions: Array<OrderTransaction>;
	isLoading: boolean;
	isValidating: boolean;
	isError: boolean;
	mutate?: Function;
}

export default function useOrderTransactions(id: String): SWRDataResponse {
	const { data, error, isLoading, isValidating, mutate } = useSWR(
		`/api/orders/${id}/transactions`,
		fetcher,
		{ revalidateOnFocus: false }
	);

	console.log('useOT', data, error, isLoading, isValidating);

	return {
		transactions: data,
		isLoading,
		isValidating,
		isError: error,
		mutate, // Used to trigger refresh
	};
}
