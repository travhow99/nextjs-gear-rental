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

export default function BlockOutForm({
	productId,
	blockOuts,
	updateBlockOuts,
}) {
	const [adding, setAdding] = useState(false);
	const [editing, setEditing] = useState(null);
	const [dateIn, setDateIn] = useState('');
	const [dateOut, setDateOut] = useState('');
	const [showDelete, setShowDelete] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	const classes = useStyles();

	/* const uploadHandler = async (e) => {
		try {
			const { data } = await axios.get('/api/blockOuts', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		} catch (error) {
			console.log('product img err', error);
		}
	}; */

	const addBlockOut = () => {
		setAdding(true);
	};

	const addBlockOutHandler = async (e) => {
		e.preventDefault();
		try {
			const formData = {
				dateIn,
				dateOut,
				product: productId,
			};

			const { data } = await axios.post('/api/blockOuts', formData);

			updateBlockOuts([...blockOuts, data]);
			setAdding(false);
			setEditing(false);
		} catch (error) {
			console.log('blockout err', error);
		}
	};

	const updateBlockOutHandler = async (e) => {
		e.preventDefault();
		try {
			const formData = {
				id: editing,
				dateIn,
				dateOut,
				product: productId,
			};

			const { data } = await axios.put(
				`/api/blockOuts/${editing}`,
				formData
			);

			const newBo = data.result;

			// Splice out
			/**
			 * @todo Update sort upon edit
			 */
			const updatedBlockOuts = blockOuts.map((bo) => {
				if (bo._id !== newBo._id) return bo;

				return newBo;
			});

			updatedBlockOuts.sort;

			updateBlockOuts(updatedBlockOuts);
			setAdding(false);
			setEditing(false);
		} catch (error) {
			console.log('blockout err', error);
		}
	};

	const handleDelete = (e, deleteId) => {
		e.stopPropagation();

		setShowDelete(true);
		setDeleteId(deleteId);
	};
	const handleCancel = () => {
		setAdding(false);
		setEditing(false);
		setDateIn('');
		setDateOut('');
	};

	const handleCancelDelete = () => {
		setShowDelete(false);
		setDeleteId(null);
	};

	const editBlockOut = ({ dateIn, dateOut, _id }) => {
		setDateIn(dateHelper.dateToDateTimeLocalFormat(dateIn));
		setDateOut(dateHelper.dateToDateTimeLocalFormat(dateOut));
		setEditing(_id);
	};

	const handleConfirmDelete = async () => {
		await axios.delete(`/api/blockOuts/${deleteId}`);

		const removeIndex = blockOuts.findIndex((bo) => bo._id === deleteId);
		const updatedBlockOuts = blockOuts.filter(
			(bo, index) => index !== removeIndex
		);

		updateBlockOuts(updatedBlockOuts);

		setShowDelete(false);
		setDeleteId(null);
	};

	return (
		<Card className={classes.section}>
			<List>
				<ListItem>
					<Typography component="p">BlockOuts</Typography>
				</ListItem>

				{adding || editing ? (
					<form
						onSubmit={
							editing ? updateBlockOutHandler : addBlockOutHandler
						}
						className={classes.form}
					>
						<ListItem>New BlockOut</ListItem>
						<ListItem>
							<TextField
								type={'datetime-local'}
								value={dateOut}
								onChange={(e) => setDateOut(e.target.value)}
							/>
						</ListItem>
						<ListItem>
							<TextField
								type={'datetime-local'}
								value={dateIn}
								onChange={(e) => setDateIn(e.target.value)}
							/>
						</ListItem>
						<ListItem>
							<Button
								variant="contained"
								fullWidth
								color="secondary"
								onClick={handleCancel}
							>
								Cancel
							</Button>
						</ListItem>
						<ListItem>
							<Button
								variant="contained"
								type="submit"
								fullWidth
								color="primary"
							>
								{adding ? 'Add' : 'Update'}
							</Button>
						</ListItem>
					</form>
				) : (
					<>
						<ListItem>
							<Paper
								className={classes.paper}
								elevation={3}
								onClick={addBlockOut}
							>
								+ Add BlockOut
							</Paper>
						</ListItem>
						{blockOuts &&
							blockOuts.length > 0 &&
							blockOuts.map((bo) => (
								<ListItem key={bo._id}>
									<Paper
										className={classes.paper}
										elevation={3}
										onClick={() => editBlockOut(bo)}
									>
										{/**
										 *
										 * @todo Display hours & minutes as well
										 *
										 */}
										{dateHelper.timestampToDate(bo.dateOut)}{' '}
										-{' '}
										{dateHelper.timestampToDate(bo.dateIn)}
										<DeleteIcon
											className={'ml-2 text-red-500'}
											onClick={(e) =>
												handleDelete(e, bo._id)
											}
										/>
									</Paper>
								</ListItem>
							))}
					</>
				)}
			</List>
			<ConfirmationDialog
				title="Delete BlockOut?"
				text="Are you sure you would like to delete this block out? This cannot be undone!"
				open={showDelete}
				handleAccept={handleConfirmDelete}
				handleCancel={handleCancelDelete}
			/>
		</Card>
	);
}
