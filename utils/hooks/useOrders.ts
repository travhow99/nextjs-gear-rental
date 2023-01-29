import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (url: string) =>
	await axios.get(url).then((res) => res.data);

export default function useOrders() {
	const { data, error, isLoading } = useSWR(`/api/seller/orders`, fetcher);

	return {
		orders: data,
		isLoading,
		isError: error,
	};
}
