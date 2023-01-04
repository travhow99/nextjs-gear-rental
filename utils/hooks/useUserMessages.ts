import useSWR from 'swr';
import UserMessage from '../../types/UserMessage';
import { fetcher } from './fetcher';

interface SWRDataResponse {
	messages: Array<UserMessage>;
	isLoading: Boolean;
	isError: Boolean;
	mutate?: Function;
}

export default function useUserMessages(id: String): SWRDataResponse {
	const { data, error, isLoading, mutate } = useSWR(
		`/api/users/messages/sale/${id}`,
		fetcher
	);

	console.log('useSP', data, error, isLoading);

	return {
		messages: data,
		isLoading,
		isError: error,
		mutate, // Used to trigger refresh
	};
}
