import useSWR from 'swr';
import UserMessage from '../../types/UserMessage';
import { fetcher } from './fetcher';

interface SWRDataResponse {
	messages: Array<UserMessage>;
	isLoading: boolean;
	isValidating: boolean;
	isError: boolean;
	mutate?: Function;
}

export default function useUserMessages(id: String): SWRDataResponse {
	const { data, error, isLoading, isValidating, mutate } = useSWR(
		`/api/users/messages/sale/${id}`,
		fetcher,
		{ revalidateOnFocus: false }
	);

	console.log('useSP', data, error, isLoading, isValidating);

	return {
		messages: data,
		isLoading,
		isValidating,
		isError: error,
		mutate, // Used to trigger refresh
	};
}
