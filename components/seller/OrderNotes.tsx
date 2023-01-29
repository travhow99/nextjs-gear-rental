import { CircularProgress, List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import dateHelper from '../../utils/dateHelper';
import useOrderNotes from '../../utils/hooks/useOrderNotes';
import SellerHelper from '../../utils/seller/SellerHelper';
import FormModal from '../@core/modals/formModal';

export default function OrderNotes({ saleId }: { saleId: string }) {
	const { notes, isLoading, isValidating, isError, mutate } =
		useOrderNotes(saleId);

	const handleSubmit = async (textValue: string) => {
		await SellerHelper.addOrderNote(saleId, textValue);

		mutate();
	};

	return isLoading ? (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<CircularProgress />
		</Box>
	) : (
		<Box>
			{notes.length ? (
				<>
					<Typography>Order Notes</Typography>
					<List>
						{notes.map((note, index) => (
							<ListItem key={index}>
								{note.note} •{' '}
								{dateHelper.toReadableTime(note.createdAt)}
							</ListItem>
						))}
					</List>
				</>
			) : null}
			<FormModal
				openText={`Add order note`}
				openTextVariant={'text'}
				dialogTitle={`Add note`}
				dialogContentText={`Please add your order note below.`}
				closeText={'Cancel'}
				submitText={'Save Note'}
				textFieldLabel={'Your Note'}
				textFieldType={'text'}
				multilineTextField={true}
				onSubmit={handleSubmit}
			/>
		</Box>
	);
}
