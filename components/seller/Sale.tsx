import {
	Card,
	List,
	ListItem,
	Table,
	TableContainer,
	Typography,
} from '@material-ui/core';
import Order from '../../types/Order';
import useStyles from '../../utils/styles';
import ItemsTable from '../products/ItemsTable';
import SellerContainer from './SellerContainer';

export default function Sale({ sale }: { sale: Order }) {
	const classes = useStyles();

	return (
		<Card className={classes.section}>
			<ListItem>
				<Typography component="h2" variant="h2">
					Order Items
				</Typography>
			</ListItem>
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
		</Card>
	);
}
