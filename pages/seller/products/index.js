import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useContext, useState } from 'react';
import {
	Grid,
	List,
	ListItem,
	Typography,
	Card,
	Button,
	ListItemText,
	TextField,
	CircularProgress,
} from '@material-ui/core';

import { useSnackbar } from 'notistack';
import { signIn, useSession } from 'next-auth/react';

import useStyles from '../../../utils/styles';
import LoadingPage from '../../../components/pages/LoadingPage';
import Loading from '../../../components/Loading';
import SellerContainer from '../../../components/seller/SellerContainer';
import SellerProductListItem from '../../../components/seller/SellerProductListItem';
import { getError } from '../../../utils/error';

function Products() {
	const [products, setProducts] = useState([]);
	const { data: session, status } = useSession({
		required: true,
	});

	console.log('session?', session);
	const isUser = !!session?.user;

	const isSeller =
		isUser && (session.user.seller || session.user.role === 'admin');

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const router = useRouter();
	const classes = useStyles();
	//   const { userInfo } = state;

	useEffect(() => {
		if (!products.length) fetchProducts();
	}, [products]);

	const fetchProducts = async () => {
		try {
			const { data } = await axios.get('/api/sellerProducts');

			console.log('got sp data', data);
			setProducts(data);
		} catch (err) {
			console.log('got err!', err);
			enqueueSnackbar(getError(err), { variant: 'error' });
		}
	};

	return status ? (
		<SellerContainer title={'Products'}>
			<Card className={classes.section}>
				<List>
					<ListItem>
						<Typography
							component="p"
							variant="subtitle1"
							className="flex-auto"
						>
							Welcome to the Products Portal!
						</Typography>
						<Button variant="outlined" color="primary">
							<Link href="/seller/products/new">Add Product</Link>
						</Button>
					</ListItem>
					<ListItem>
						{products?.length ? (
							<Grid container spacing={1}>
								{products.map((product) => (
									<Grid key={product._id} item xs={12}>
										<SellerProductListItem
											id={product._id}
											image={product.images[0]?.path}
											title={product.title}
											price={product.price}
										/>
									</Grid>
								))}
							</Grid>
						) : (
							<Typography component="p" variant="subtitle2">
								Add your first product!
							</Typography>
						)}
					</ListItem>
				</List>
			</Card>
		</SellerContainer>
	) : (
		<Loading />
	);
}

Products.auth = {
	role: 'seller',
	loading: <LoadingPage />,
	unauthorized: '/',
};

export default Products;
