import {
	Link,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import NextLink from 'next/link';
import ProductHelper from '../../utils/helpers/ProductHelper';
import Order from '../../types/Order';

interface OrdersTableProps {
	sales: Array<Order>;
}

export default function OrdersTable(props: OrdersTableProps) {
	const { sales } = props;
	return sales.length ? (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Order Placed</TableCell>
						<TableCell>Total</TableCell>
						<TableCell>Order #</TableCell>
						<TableCell>Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{sales.map((order) => (
						// @ts-ignore
						<TableRow key={order.id}>
							<TableCell>
								{ProductHelper.formatPurchaseDate(
									order.createdAt
								)}
							</TableCell>
							<TableCell>
								${ProductHelper.roundToPenny(order.totalPrice)}
							</TableCell>
							<TableCell>
								<NextLink
									href={`/seller/sales/${order.id}`}
									passHref
								>
									<Link>
										{/* @todo Why is this underlined, but not components/products/RentalTable.tsx? */}
										<Typography>{order.id}</Typography>
									</Link>
								</NextLink>
							</TableCell>
							<TableCell>
								{order.softDelete
									? 'Order Cancelled'
									: order.isPaid
									? 'Paid'
									: 'Not Paid'}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	) : (
		<div>
			<Typography variant="body1">No Orders Exist!</Typography>
		</div>
	);
}
