import Head from 'next/head';
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
import SimpleItem from '../products/SimpleItem';
import utilStyles from '../../styles/utils.module.css';
import SellerProduct from '../../types/SellerProduct';

export default function HomeCallToAction({
	topItems,
}: {
	topItems: Array<SellerProduct>;
}) {
	console.log(topItems);
	return (
		<>
			<Typography component={'h1'} variant={'h1'}>
				Products
			</Typography>

			<Grid container spacing={3}>
				{topItems.map((product) => (
					<Grid item md={4} xs={12} key={product.id}>
						<SimpleItem product={product} />
					</Grid>
				))}
			</Grid>
		</>
	);
}
