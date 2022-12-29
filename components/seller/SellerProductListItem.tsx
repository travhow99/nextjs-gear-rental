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

export default function SellerProductListItem({ id, image, title, price }) {
	return (
		<Card>
			<NextLink href={`/seller/products/${id}`} passHref>
				<CardActionArea>
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
								<Delete className="text-red-500 disabled" />
							</Grid>
						</Grid>
					</CardContent>
				</CardActionArea>
			</NextLink>
		</Card>
	);
}
