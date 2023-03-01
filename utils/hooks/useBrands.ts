import { Brand } from '@prisma/client';
import axios from 'axios';
import useSWR from 'swr';
import Order from '../../types/Order';
import { fetcher } from './fetcher';

interface SWRDataResponse {
	brands: Array<Brand>;
	isLoading: boolean;
	isValidating: boolean;
	isError: boolean;
	mutate?: Function;
}

export default function useBrands(): SWRDataResponse {
	const { data, error, isLoading, isValidating, mutate } = useSWR(
		`/api/brands`,
		fetcher,
		{ revalidateOnFocus: false }
	);

	return {
		brands: data,
		isLoading,
		isValidating,
		isError: error,
		mutate,
	};
}
