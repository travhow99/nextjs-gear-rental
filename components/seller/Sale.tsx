import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Grid,
	List,
	ListItem,
	Table,
	TableContainer,
	Typography,
} from '@material-ui/core';
import Order from '../../types/Order';
import dateHelper from '../../utils/dateHelper';
import useStyles from '../../utils/styles';
import ItemsTable from '../products/ItemsTable';

export default function Sale({ sale }: { sale: Order }) {
	const classes = useStyles();

	return (
		<Card className={classes.section}>
			<Grid
				className={`${classes.primary} ${classes.textWhite} p-2`}
				container
				spacing={2}
			>
				<Grid item xs={4}>
					<Typography variant="overline" display="block" gutterBottom>
						Order Placed{' '}
					</Typography>
					{dateHelper.timestampToDate(sale.createdAt)}
				</Grid>
				<Grid item xs={4}>
					<Typography variant="overline" display="block" gutterBottom>
						Total
					</Typography>
					${sale.totalPrice}
				</Grid>
				<Grid item xs={4}>
					<Typography variant="overline" display="block" gutterBottom>
						Rented by
					</Typography>
					{sale.user.name}
				</Grid>
			</Grid>
			<CardContent>
				<ListItem>
					<ItemsTable
						isCartPage={false}
						items={sale.rentals.map((r) => {
							return {
								...r.product,
								dateOut: r.dateOut,
								dateDue: r.dateDue,
							};
						})}
					/>
				</ListItem>
			</CardContent>
		</Card>
	);
}
