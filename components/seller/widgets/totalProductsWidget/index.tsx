import axios from 'axios';
import { useEffect, useState } from 'react';
import DataCard from '../../../@core/cards/dataCard';
import useSWR from 'swr';

const fetcher = async (url: string) =>
	await axios.get(url).then((res) => res.data);

function useTotalProducts() {
	const { data, error, isLoading } = useSWR(
		`/api/seller/products/totalProducts`,
		fetcher
	);

	return {
		products: data,
		isLoading,
		isError: error,
	};
}

export default function TotalProductsWidget() {
	const { products, isError, isLoading } = useTotalProducts();

	return (
		<DataCard
			headerText="Total Products"
			content={!isLoading ? String(products) : 0}
			fetchedData={!isLoading}
		/>
	);
}
