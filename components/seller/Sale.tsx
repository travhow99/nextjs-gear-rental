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
				className={`${classes.bgSecondary} ${classes.textWhite} p-2 text-center`}
				container
				spacing={2}
			>
				<Grid item xs={4}>
					<Typography variant="overline" display="block">
						Order Placed{' '}
					</Typography>
					<Typography variant="caption" display="block" gutterBottom>
						{dateHelper.timestampToDate(sale.createdAt)}
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<Typography variant="overline" display="block">
						Total
					</Typography>
					<Typography variant="caption" display="block" gutterBottom>
						${sale.totalPrice}
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<Typography variant="overline" display="block">
						Rented by
					</Typography>
					<Typography variant="caption" display="block" gutterBottom>
						{sale.user.name}
						{/* @todo User contact button */}
					</Typography>
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
