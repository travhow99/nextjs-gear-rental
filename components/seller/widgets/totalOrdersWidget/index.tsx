import axios from 'axios';
import { useEffect, useState } from 'react';
import DataCard from '../../../@core/cards/dataCard';
import useSWR from 'swr';

const fetcher = async (url: string) =>
	await axios.get(url).then((res) => res.data);

function useTotalOrders() {
	const { data, error, isLoading } = useSWR(
		`/api/seller/orders/totalOrders`,
		fetcher
	);

	return {
		orders: data,
		isLoading,
		isError: error,
	};
}

export default function TotalOrdersWidget() {
	const { orders, isError, isLoading } = useTotalOrders();

	return (
		<DataCard
			headerText="Total Orders"
			content={!isLoading ? String(orders) : null}
			fetchedData={!isLoading}
		/>
	);
}
