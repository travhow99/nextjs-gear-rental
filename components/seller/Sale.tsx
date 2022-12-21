import {
	Box,
	Button,
	Card,
	CardActions,
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
				className={`${classes.bgSecondary} ${classes.textWhite} px-2 text-center`}
				container
				spacing={2}
			>
				<Grid item xs={3}>
					<Typography variant="overline" display="block">
						Order Placed{' '}
					</Typography>
					<Typography variant="caption" display="block">
						{dateHelper.timestampToDate(sale.createdAt)}
					</Typography>
				</Grid>
				<Grid item xs={3}>
					<Typography variant="overline" display="block">
						Total
					</Typography>
					<Typography variant="caption" display="block">
						${sale.totalPrice}
					</Typography>
				</Grid>
				<Grid item xs={3}>
					<Typography variant="overline" display="block">
						Rented by
					</Typography>
					<Typography variant="caption" display="block">
						{sale.user.name}
						{/* @todo User contact button */}
					</Typography>
				</Grid>
				<Grid item xs={3}>
					<Typography variant="overline" display="block">
						Status
					</Typography>
					<Typography variant="caption" display="block">
						{sale.isPaid && sale.paidAt
							? `Paid ${dateHelper.dateToDateTimeLocalFormat(
									sale.paidAt
							  )}`
							: 'Not Paid'}
					</Typography>
				</Grid>
			</Grid>
			<CardContent>
				<ListItem>
					<ItemsTable
						isCartPage={false}
						items={sale.rentals.map((r) => {
							if (typeof r.product === 'object') {
								return {
									...r.product,
									dateOut: r.dateOut,
									dateDue: r.dateDue,
								};
							}
						})}
					/>
				</ListItem>
			</CardContent>
			<CardActions>
				{/* <Button size="small">Archive Order</Button> */}
			</CardActions>
		</Card>
	);
}
