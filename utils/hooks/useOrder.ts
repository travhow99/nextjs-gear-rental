import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (url: string) =>
	await axios.get(url).then((res) => res.data);

export default function useOrder(id: string) {
	const { data, error, isLoading, mutate } = useSWR(
		`/api/seller/orders/${id}`,
		fetcher
	);

	return {
		order: data,
		isLoading,
		isError: error,
		mutate,
	};
}
