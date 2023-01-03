import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (url: string) =>
	await axios.get(url).then((res) => res.data);

export default function useSellerProducts() {
	const { data, error, isLoading, mutate } = useSWR(
		`/api/sellerProducts`,
		fetcher
	);

	return {
		products: data,
		isLoading,
		isError: error,
		mutate,
	};
}
