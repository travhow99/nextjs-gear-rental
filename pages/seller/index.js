import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useContext } from 'react';
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
	Box,
	CardContent,
} from '@material-ui/core';
import { getError } from '../../utils/error';
import useStyles from '../../utils/styles';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import Layout from '../../components/layout/Layout';
import { signIn, useSession } from 'next-auth/react';
import ProfileContainer from '../../components/account/ProfileContainer';
import Loading from '../../components/Loading';
import LoadingPage from '../../components/pages/LoadingPage';
import SideNav from '../../components/layout/SideNav';
import SellerContainer from '../../components/seller/SellerContainer';
import TotalProductsWidget from '../../components/seller/widgets/totalProductsWidget';
import RecentOrdersWidget from '../../components/seller/widgets/recentOrdersWidget';
import TotalOrdersWidget from '../../components/seller/widgets/totalOrdersWidget';
import OrdersTable from '../../components/seller/OrdersTable';
import useOrders from '../../utils/hooks/useOrders';

function Seller() {
	const { orders, isLoading, isError } = useOrders();
	const { data: session, status } = useSession({
		required: true,
	});

	console.log('session?', session);
	const isUser = !!session?.user;

	const isSeller =
		isUser && (session.user.seller || session.user.role === 'admin');

	console.log('is seller?', isSeller);
	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const router = useRouter();
	const classes = useStyles();
	//   const { userInfo } = state;

	return status ? (
		<SellerContainer title={'Seller'}>
			{/* <Card className={classes.section}> */}
			<Box mb={2} sx={{ padding: 2 }}>
				<Box>
					<Typography component="h1" variant="h1">
						Seller
					</Typography>
				</Box>
				<Box>
					<Typography component="p" variant="subtitle1">
						Welcome to the Seller Portal!
					</Typography>
				</Box>
			</Box>

			<Grid container spacing={6} alignItems="stretch">
				<Grid item xs={12} sm={6} md={4}>
					<TotalProductsWidget />
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<TotalOrdersWidget />
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<RecentOrdersWidget />
				</Grid>
			</Grid>

			<Box mt={2}>
				<Card sx={{ width: '100%' }}>
					<CardContent>
						{/* <Grid container spacing={6}> */}
						{/* <Grid item xs={12} sx={{ paddingBottom: 4 }}> */}
						<Typography variant="h5">Recent Orders</Typography>
						{/* </Grid> */}
						<Grid item xs={12} sx={{ paddingBottom: 4 }}>
							<OrdersTable sales={isLoading ? [] : orders} />
						</Grid>
					</CardContent>
					{/* </Grid> */}
				</Card>
			</Box>
			{/* </Card> */}
		</SellerContainer>
	) : (
		<Loading />
	);
}

Seller.auth = { role: 'seller', loading: <LoadingPage />, unauthorized: '/' };

export default Seller;
