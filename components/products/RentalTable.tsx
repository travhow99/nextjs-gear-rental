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
import FormModal from '../@core/modals/formModal';
import UserContactForm from '../utilities/dialogs/UserContactForm';

const organizeRentals = (rentals: Array<Rental>) => {
	const past = rentals.filter((r) =>
		isBefore(new Date(r.dateDue), new Date())
	);

	const upcoming = rentals.filter((r) =>
		isAfter(new Date(r.dateDue), new Date())
	);

	return {
		past,
		upcoming,
	};
};

const generateRentalComponent = (rentals: Array<Rental>) => {
	return rentals.length ? (
		<TableContainer>
			<Table /* sx={{ minWidth: 650 }} */ /* aria-label="simple table" */>
				<TableHead>
					<TableRow>
						<TableCell align="right">Renter</TableCell>
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
							<TableCell align="right">
								<UserContactForm
									user={rental.user}
									productId={
										typeof rental.product === 'string'
											? rental.product
											: rental.product._id
									}
									rentalId={rental._id}
								/>
							</TableCell>
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
	) : (
		<Typography>No rentals exist</Typography>
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
