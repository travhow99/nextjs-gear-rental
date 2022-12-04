import * as React from 'react';
import NavigationCard from '../@core/cards/navigationCard';
import { NavigationCardTab } from '../../types/NavigationCard';

const tabs: Array<NavigationCardTab> = [
	{
		title: 'Upcoming',
		text: 'asldknfksnalkfd',
	},
	{
		title: 'Past',
		text: 'asldknfksnalkfd',
	},
];

export default function RentalTable() {
	return <NavigationCard tabs={tabs} />;
}
