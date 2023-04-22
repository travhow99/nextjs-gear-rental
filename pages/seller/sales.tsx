import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useEffect, useContext } from 'react';
import {
	Grid,
	Link,
	List,
	ListItem,
	Typography,
	Card,
	Button,
	ListItemText,
	TextField,
	CircularProgress,
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Chip,
} from '@material-ui/core';
import { getError } from '../../utils/error';
import useStyles from '../../utils/styles';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import Layout from '../../components/layout/Layout';
import { useSession } from 'next-auth/react';
import ProfileContainer from '../../components/account/ProfileContainer';
import Loading from '../../components/Loading';
import LoadingPage from '../../components/pages/LoadingPage';
import SideNav from '../../components/layout/SideNav';

import { Stack } from '@mui/material';
import ProductHelper from '../../utils/helpers/ProductHelper';
import SellerContainer from '../../components/seller/SellerContainer';
import { useDispatch, useSelector } from 'react-redux';
import {
	sellerSalesFail,
	sellerSalesRequest,
	sellerSalesSuccess,
} from '../../redux/seller/sellerSlice';
import OrdersTable from '../../components/seller/OrdersTable';
import useSellerOrders from '../../utils/hooks/useSellerOrders';

function SellerSales() {
	const { orders, isLoading, isError } = useSellerOrders();

	/* const dispatch = useDispatch();
	const {
		seller: { sales },
	} = useSelector((state) => state); */

	const { data: session, status } = useSession({
		required: true,
	});

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const router = useRouter();
	const classes = useStyles();
	//   const { userInfo } = state;

	return status ? (
		<SellerContainer title={'Sales'}>
			<Card className={classes.section}>
				<List>
					<ListItem>
						<Typography component="h1" variant="h1">
							Sales
						</Typography>
					</ListItem>
					<ListItem>
						<Typography component="p" variant="subtitle1">
							Here are your recent sales.
						</Typography>
					</ListItem>
				</List>
			</Card>
			<Card className={classes.section}>
				<List>
					{orders ? (
						<OrdersTable sales={orders} />
					) : (
						<ListItem>No orders found.</ListItem>
					)}
				</List>
			</Card>
		</SellerContainer>
	) : (
		<Loading />
	);
}

SellerSales.auth = {
	role: 'seller',
	loading: <LoadingPage />,
	unauthorized: '/',
};

export default SellerSales;
