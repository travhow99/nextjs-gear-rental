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
import useSellerProducts from '../../../utils/hooks/useSellerProducts';

/**
 * @todo useSWR
 */
function Products() {
	const { products, isLoading, isError, mutate } = useSellerProducts();

	// const [products, setProducts] = useState([]);
	// const [fetchedProducts, setFetchedProducts] = useState(false);

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
											reRender={mutate}
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
