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
import MessageLog from './MessageLog';
import SellerHelper from '../../utils/seller/SellerHelper';
import ArchiveOrderButton from './ArchiveOrderButton';
import useOrder from '../../utils/hooks/useOrder';
import Loading from '../Loading';
import Rental from '../../types/Rental';
import OrderNotes from './OrderNotes';
import OrderTransactions from '../orders/OrderTransactions';

export default function Sale({ saleId }: { saleId: string }) {
	const { order, isLoading, isError, mutate } = useOrder(saleId);

	const classes = useStyles();

	return isLoading ? (
		<Loading />
	) : (
		<>
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
							{dateHelper.timestampToDate(order.createdAt)}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant="overline" display="block">
							Total
						</Typography>
						<Typography variant="caption" display="block">
							${order.totalPrice}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant="overline" display="block">
							Rented by
						</Typography>
						<Typography variant="caption" display="block">
							{order.user.name}
							{/* @todo User contact button */}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant="overline" display="block">
							Status
						</Typography>
						<Typography variant="caption" display="block">
							{order.softDelete
								? 'Order Cancelled'
								: order.isPaid && order.paidAt
								? `Paid ${dateHelper.toReadableTime(
										dateHelper.dateToDateTimeLocalFormat(
											order.paidAt
										)
								  )}`
								: 'Not Paid'}
						</Typography>
					</Grid>
				</Grid>
				<CardContent>
					<ListItem>
						<ItemsTable
							isCartPage={false}
							items={order.rentals.map((r: Rental) => {
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
					<ListItem>
						<OrderTransactions saleId={saleId} />
					</ListItem>
					<ListItem>
						<OrderNotes saleId={saleId} />
					</ListItem>
				</CardContent>
				<CardActions className="justify-center">
					{order.softDelete ? (
						<div>Order Cancelled</div>
					) : (
						<ArchiveOrderButton
							saleId={order._id}
							reRender={mutate}
						/>
					)}
				</CardActions>
			</Card>
			<MessageLog saleId={order._id} user={order.user} />
		</>
	);
}
