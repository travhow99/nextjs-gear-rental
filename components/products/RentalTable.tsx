import * as React from 'react';
import NavigationCard from '../@core/cards/navigationCard';
import { NavigationCardTab } from '../../types/NavigationCard';
import Rental from '../../types/Rental';
import { isAfter, isBefore } from 'date-fns';
import {
	Link,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@material-ui/core';
import dateHelper from '../../utils/dateHelper';
import NextLink from 'next/link';

const organizeRentals = (rentals: Array<Rental>) => {
	const past = rentals.filter((r) =>
		isBefore(new Date(r.dateDue), new Date())
	);

	const upcoming = rentals.filter((r) =>
		isAfter(new Date(r.dateDue), new Date())
	);

	console.log('got org', past, upcoming);

	return {
		past,
		upcoming,
	};
};

const generateRentalComponent = (rentals: Array<Rental>) => {
	return (
		<TableContainer>
			<Table /* sx={{ minWidth: 650 }} */ /* aria-label="simple table" */>
				<TableHead>
					<TableRow>
						{/* <TableCell align="right"></TableCell> */}
						<TableCell align="right">Date Out</TableCell>
						<TableCell align="right">Date Due</TableCell>
						<TableCell align="right">Status</TableCell>
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
							{/* <TableCell component="th" scope="row"></TableCell> */}
							<TableCell align="right">
								{dateHelper.timestampToDate(rental.dateOut)}
							</TableCell>
							<TableCell align="right">
								{dateHelper.timestampToDate(rental.dateDue)}
							</TableCell>
							<TableCell align="right">
								<NextLink
									href={`/seller/sales/${rental.orderId}`}
									passHref
								>
									<Link>
										<Typography>
											{rental.dateReturned
												? `Returned ${dateHelper.timestampToDate(
														rental.dateReturned
												  )}`
												: 'Pending'}
										</Typography>
									</Link>
								</NextLink>
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
