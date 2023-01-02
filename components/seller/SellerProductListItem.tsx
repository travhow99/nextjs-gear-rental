import {
	Grid,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
} from '@material-ui/core';
import Delete from '@mui/icons-material/Delete';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ProductHelper from '../../utils/helpers/ProductHelper';
import ConfirmationDialog from '../utilities/dialogs/ConfirmationDialog';

export default function SellerProductListItem({
	id,
	image,
	title,
	price,
	reRender,
}) {
	const router = useRouter();
	const [showDelete, setShowDelete] = useState(false);

	const handleConfirmDelete = async () => {
		await ProductHelper.deleteSellerProduct(id);

		reRender();
	};

	return (
		<Card>
			{/* <NextLink href={`/seller/products/${id}`} passHref> */}
			<CardActionArea
				onClick={() => router.push(`/seller/products/${id}`)}
			>
				<CardContent>
					<Grid container>
						<Grid item xs={2}>
							<Image
								src={
									image ||
									'https://res.cloudinary.com/dwkrq4yib/image/upload/v1646708202/upload-g7c1cfd275_1280_nfmiiy.png'
								}
								alt={title}
								width={50}
								height={50}
							></Image>
						</Grid>

						<Grid item xs={8}>
							<Typography>{title}</Typography>
						</Grid>

						<Grid item xs={1}>
							<Typography>${price}</Typography>
						</Grid>

						<Grid item xs={1}>
							{/**
							 * @todo Delete product action
							 */}
							<Delete
								onClick={(e) => {
									e.stopPropagation();
									setShowDelete(true);
								}}
								className="text-red-500"
							/>
						</Grid>
					</Grid>
				</CardContent>
			</CardActionArea>
			{/* </NextLink> */}
			<ConfirmationDialog
				title="Delete Product?"
				text="Are you sure you would like to delete this product? This cannot be undone!"
				open={showDelete}
				handleAccept={handleConfirmDelete}
				handleCancel={() => setShowDelete(false)}
			/>
		</Card>
	);
}
