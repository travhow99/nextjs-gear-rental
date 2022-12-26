import axios from 'axios';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import DataCard from '../../../@core/cards/dataCard';

const fetcher = async (url: string) =>
	await axios.get(url).then((res) => res.data);

function useRecentOrders() {
	const { data, error, isLoading } = useSWR(
		`/api/seller/orders/recentOrders`,
		fetcher
	);

	return {
		orders: data,
		isLoading,
		isError: error,
	};
}

export default function RecentOrdersWidget() {
	const { orders, isError, isLoading } = useRecentOrders();

	return (
		<DataCard
			headerText="Recent Orders"
			content={!isLoading ? String(orders) : null}
			fetchedData={!isLoading}
		/>
	);
}
