import { CircularProgress, List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import OrderTransaction from '../../types/OrderTransaction';
import dateHelper from '../../utils/dateHelper';
import useOrderTransactions from '../../utils/hooks/useOrderTransactions';

export default function OrderTransactions({
	saleId,
	transactions,
}: {
	saleId: string;
	transactions: Array<OrderTransaction>;
}) {
	// const { transactions, isLoading, isValidating, isError } =
	// 	useOrderTransactions(saleId);

	return false /* isLoading */ ? (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<CircularProgress />
		</Box>
	) : (
		<Box>
			{transactions.length ? (
				<>
					<Typography>Order Transactions</Typography>
					<List>
						{transactions.map((transaction, index) => (
							<ListItem key={index}>
								{/**
								 * @todo Link to paypal transaction?
								 */}
								{transaction.type} •{' '}
								{dateHelper.toReadableTime(
									transaction.createdAt
								)}
							</ListItem>
						))}
					</List>
				</>
			) : null}
		</Box>
	);
}
