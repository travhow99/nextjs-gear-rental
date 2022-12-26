import { useEffect, useState } from 'react';
import DataCard from '../../../@core/cards/dataCard';

export default function TotalOrdersWidget() {
	const [data, setData] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setData(true);
		}, 1000);
	}, []);

	return (
		<DataCard
			headerText="Total Orders"
			content={String(Math.floor(Math.random() * 100))}
			fetchedData={data}
		/>
	);
}
