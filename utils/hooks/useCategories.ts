import { Category } from '@prisma/client';
import useSWR from 'swr';
import { fetcher } from './fetcher';

interface SWRDataResponse {
	categories: Array<Category>;
	isLoading: boolean;
	isValidating: boolean;
	isError: boolean;
	mutate?: Function;
}

export default function useCategories(): SWRDataResponse {
	const { data, error, isLoading, isValidating, mutate } = useSWR(
		`/api/categories`,
		fetcher,
		{ revalidateOnFocus: false }
	);

	return {
		categories: data,
		isLoading,
		isValidating,
		isError: error,
		mutate,
	};
}
