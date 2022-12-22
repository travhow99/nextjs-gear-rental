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
import BasicCard from '../../components/@core/cards/basicCard';
import OrdersTable from '../../components/seller/OrdersTable';

function Seller() {
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
			<Card className={classes.section}>
				<Box sx={{ padding: 2 }}>
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

					<Grid container spacing={6} sx={{ marginBottom: 2 }}>
						<Grid item xs={12} sm={6} md={4}>
							<BasicCard
								headerText="Total Products"
								content={String(
									Math.floor(Math.random() * 100)
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<BasicCard
								headerText="Total Orders"
								content={String(
									Math.floor(Math.random() * 100)
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<BasicCard
								headerText="Recent Orders"
								content={String(
									Math.floor(Math.random() * 100)
								)}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={6}>
						<Grid item xs={12} sx={{ paddingBottom: 4 }}>
							<Typography variant="h5">Recent Orders</Typography>
						</Grid>
						<Grid item xs={12} sx={{ paddingBottom: 4 }}>
							<OrdersTable sales={[]} />
						</Grid>
					</Grid>
				</Box>
			</Card>
		</SellerContainer>
	) : (
		<Loading />
	);
}

Seller.auth = { role: 'seller', loading: <LoadingPage />, unauthorized: '/' };

export default Seller;
