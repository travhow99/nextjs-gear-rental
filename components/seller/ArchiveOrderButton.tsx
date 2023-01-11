import { Button } from '@mui/material';
import { useState } from 'react';
import SellerHelper from '../../utils/seller/SellerHelper';
import useStyles from '../../utils/styles';
import ConfirmationDialog from '../utilities/dialogs/ConfirmationDialog';

const ArchiveOrderButton = ({
	saleId,
	reRender,
}: {
	saleId: string;
	reRender?: Function;
}) => {
	const [showArchive, setShowArchive] = useState(false);

	const handleCancel = async () => {
		await SellerHelper.archiveOrder(saleId);

		if (reRender) reRender();

		setShowArchive(false);
	};

	return (
		<>
			<Button
				onClick={() => setShowArchive(true)}
				size="small"
				variant="outlined"
				color="secondary"
			>
				Cancel Order
			</Button>

			<ConfirmationDialog
				title="Cancel order?"
				text="Are you sure you would like to cancel this order? This cannot be undone!"
				open={showArchive}
				handleAccept={handleCancel}
				handleCancel={() => setShowArchive(false)}
			/>
		</>
	);
};

export default ArchiveOrderButton;
