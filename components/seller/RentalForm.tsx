import { Card, Grid } from '@material-ui/core';
import {
	Button,
	List,
	ListItem,
	Paper,
	Stack,
	styled,
	TextField,
	Typography,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import dateHelper from '../../utils/dateHelper';
import useStyles from '../../utils/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from '../utilities/dialogs/ConfirmationDialog';
import BetaProductCalendar from '../products/BetaProductCalendar';
import Rental from '../../types/Rental';
import RentalTable from '../products/RentalTable';

export default function RentalForm({ productId, rentals }) {
	const [adding, setAdding] = useState(false);
	const [editing, setEditing] = useState(null);
	const [dateIn, setDateIn] = useState('');
	const [dateOut, setDateOut] = useState('');
	const [showDelete, setShowDelete] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	const [dateRange, setDateRange] = useState({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	});

	const classes = useStyles();

	const handleCancelDelete = () => {
		setShowDelete(false);
		setDeleteId(null);
	};

	const handleConfirmDelete = async () => {
		await axios.delete(`/api/blockOuts/${deleteId}`);

		const removeIndex = rentals.findIndex((bo) => bo._id === deleteId);
		const updatedRentals = rentals.filter(
			(_rental: Rental, index: number) => index !== removeIndex
		);

		// updateRentals(updatedRentals);

		setShowDelete(false);
		setDeleteId(null);
	};

	return (
		<Card className={classes.section}>
			<List>
				<ListItem>
					<Typography component="p">Rentals</Typography>
				</ListItem>

				<ListItem>
					{/* <BetaProductCalendar
						range={dateRange}
						setRange={setDateRange}
						productId={productId}
						isAdmin={true}
					/> */}

					<RentalTable rentals={rentals} />
				</ListItem>
			</List>
		</Card>
	);
}
