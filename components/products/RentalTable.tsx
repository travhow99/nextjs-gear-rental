import * as React from 'react';
import NavigationCard from '../@core/cards/navigationCard';
import { NavigationCardTab } from '../../types/NavigationCard';
import Rental from '../../types/Rental';
import { isAfter, isBefore } from 'date-fns';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';

const organizeRentals = (rentals: Array<Rental>) => {
	const past = rentals.filter((r) =>
		isBefore(new Date(), new Date(r.dateDue))
	);

	const upcoming = rentals.filter((r) =>
		isAfter(new Date(), new Date(r.dateDue))
	);

	console.log('got org', past, upcoming);

	return {
		past,
		upcoming,
	};
};

const generateRentalComponent = (rentals: Array<Rental>) => {
	return (
		<TableContainer component={Paper}>
			<Table /* sx={{ minWidth: 650 }} */ /* aria-label="simple table" */>
				<TableHead>
					<TableRow>
						<TableCell>Dessert (100g serving)</TableCell>
						<TableCell align="right">Calories</TableCell>
						<TableCell align="right">Fat&nbsp;(g)</TableCell>
						<TableCell align="right">Carbs&nbsp;(g)</TableCell>
						<TableCell align="right">Protein&nbsp;(g)</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rentals.map((rental: Rental) => (
						<TableRow
							key={rental._id}
							/* sx={{
								'&:last-child td, &:last-child th': {
									border: 0,
								},
							}} */
						>
							<TableCell component="th" scope="row"></TableCell>
							<TableCell align="right">
								{rental.dateOut}
							</TableCell>
							<TableCell align="right">
								{rental.dateDue}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default function RentalTable({ rentals }: { rentals: Array<Rental> }) {
	const organizedRentals = organizeRentals(rentals);
	const tabs: Array<NavigationCardTab> = [
		{
			title: 'Upcoming',
			content: generateRentalComponent(organizedRentals.upcoming),
		},
		{
			title: 'Past',
			content: generateRentalComponent(organizedRentals.past),
		},
	];

	console.log('r table got rentals', rentals);
	return <NavigationCard tabs={tabs} />;
}
