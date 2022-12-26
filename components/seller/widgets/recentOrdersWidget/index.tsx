import { useEffect, useState } from 'react';
import DataCard from '../../../@core/cards/dataCard';

export default function RecentOrdersWidget() {
	const [data, setData] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setData(true);
		}, 1000);
	}, []);

	return (
		<DataCard
			headerText="Recent Orders"
			content={String(Math.floor(Math.random() * 100))}
			fetchedData={data}
		/>
	);
}
