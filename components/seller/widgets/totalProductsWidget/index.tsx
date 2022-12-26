import { useEffect, useState } from 'react';
import DataCard from '../../../@core/cards/dataCard';

export default function TotalProductsWidget() {
	const [data, setData] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setData(true);
		}, 1000);
	}, []);

	return (
		<DataCard
			headerText="Total Products"
			content={String(Math.floor(Math.random() * 100))}
			fetchedData={data}
		/>
	);
}
