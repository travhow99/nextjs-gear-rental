import {
	Button,
	Card,
	CircularProgress,
	Grid,
	Link,
	List,
	ListItem,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@material-ui/core';
import Image from 'next/image';
import NextLink from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import axios from 'axios';
import { useRouter } from 'next/router';

import { useSnackbar } from 'notistack';
import { signIn, useSession } from 'next-auth/react';

import Layout from '../../components/layout/Layout';
import useStyles from '../../utils/styles';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { getError } from '../../utils/error';
import ProductHelper from '../../utils/helpers/ProductHelper';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import {
	orderRequest,
	orderSucces,
	orderFail,
} from '../../redux/orders/ordersSlice';
import { payFail, payRequest, paySucces } from '../../redux/paypal/payPalSlice';
import NotFound from '../../components/pages/NotFound';
import ItemsTable from '../../components/products/ItemsTable';

/**
 * @todo trigger rerender on successful payment
 */
function Order({ params }) {
	const orderId = params.id;
	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
	const classes = useStyles();
	const router = useRouter();

	const { closeSnackbar, enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();
	const { orders, paypal } = useSelector((state) => state);

	const { status, data: session } = useSession({
		required: true,
	});

	console.log('orders?', orders);

	const order = orders.orders.find((o) => o._id === orderId);

	useEffect(() => {
		if (
			!order ||
			!order._id ||
			paySuccess ||
			(order._id && order._id !== orderId)
		) {
			fetchOrder();
			if (paySuccess) {
				dispatch(payReset());
			}
		} else {
			loadPayPalScript();
		}
	}, [order, paySuccess]);

	const fetchOrder = async () => {
		console.log('fetch order');
		try {
			dispatch(orderRequest());

			const { data } = await axios.get(`/api/orders/history`);
			console.log('got data', data);

			dispatch(orderSucces(data));
		} catch (error) {
			dispatch(orderFail(error));
		}
	};

	if (!order) {
		return (
			<NotFound>
				<Typography component={'h1'} variant={'h1'}>
					Order not found
				</Typography>
			</NotFound>
		);
	}

	console.log(order);
	const {
		// shippingAddress,
		paymentMethod,
		rentals,
		itemsPrice,
		taxPrice,
		// shippingPrice,
		totalPrice,
		isPaid,
		paidAt,
		isDelivered,
		deliveredAt,
	} = order;
	console.log('R', rentals);

	const { paySuccess, payLoading, payError } = paypal;

	const taxTotal = ProductHelper.determineTax(itemsPrice, taxPrice);

	const loadPayPalScript = async () => {
		console.log('paypal');

		const { data: clientId } = await axios.get('/api/keys/paypal');

		paypalDispatch({
			type: 'resetOptions',
			value: {
				'client-id': clientId,
				currency: 'USD',
			},
		});
		paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
	};

	const createOrder = (data, actions) => {
		return actions.order
			.create({
				purchase_units: [
					{
						amount: {
							value: ProductHelper.roundToPenny(totalPrice),
						},
					},
				],
			})
			.then((orderID) => {
				return orderID;
			});
	};

	const onApprove = (data, actions) => {
		return actions.order.capture().then(async (details) => {
			console.log('GOT PAYPAL DETAILS:', details);
			try {
				dispatch(payRequest);

				const { data } = await axios.put(
					`/api/orders/${order._id}/pay`,
					details
				);

				// dispatch({ type: 'PAY_SUCCESS', payload: data });
				dispatch(paySucces);

				enqueueSnackbar('Order paid successfully!', {
					variant: 'success',
				});
			} catch (err) {
				const error = getError(err);
				// dispatch({ type: 'PAY_FAIL', payload: getError(err) });

				dispatch(payFail(error));

				enqueueSnackbar(error, { variant: 'error' });
			}
		});
	};

	const onError = (err) => {
		enqueueSnackbar(getError(err), { variant: 'error' });
	};

	return status ? (
		<Layout title={`Order ${orderId}`}>
			<Typography coponent="h1" variant="h1">
				Order {orderId}
			</Typography>

			{/**
			 * @todo requestLoading defaulting to false from previous request
			 */}
			{orders.requestLoading || !orders.orders.length ? (
				<CircularProgress />
			) : orders.requestError ? (
				<Typography className={classes.error}>
					{orders.requestError}
				</Typography>
			) : (
				<Grid container spacing={1}>
					<Grid item md={9} xs={12}>
						<Card className={classes.section}>
							<List>
								<ListItem>
									<Typography component="h2" variant="h2">
										Payment Method
									</Typography>
								</ListItem>
								<ListItem>{paymentMethod}</ListItem>
							</List>
						</Card>

						<Card className={classes.section}>
							<List>
								<ListItem>
									<Typography component="h2" variant="h2">
										Order Items
									</Typography>
								</ListItem>
								<ListItem>
									<ItemsTable
										items={rentals.map((r) => {
											return {
												...r.product,
												dateOut: r.dateOut,
												dateDue: r.dateDue,
											};
										})}
									/>
								</ListItem>
							</List>
						</Card>
					</Grid>
					<Grid item md={3} xs={12}>
						<Card className={classes.section}>
							<List>
								<ListItem>
									<Typography variant="h2">
										Order Summary
									</Typography>
								</ListItem>
								<ListItem>
									<Grid container spacing={1}>
										<Grid item md={6} xs={6}>
											<Typography>Subtotal</Typography>
										</Grid>
										<Grid item md={6} xs={6}>
											<Typography align="right">
												$
												{ProductHelper.roundToPenny(
													itemsPrice
												)}
											</Typography>
										</Grid>
									</Grid>
								</ListItem>
								<ListItem>
									<Grid container spacing={1}>
										<Grid item md={6} xs={6}>
											<Typography>Tax</Typography>
										</Grid>
										<Grid item md={6} xs={6}>
											<Typography align="right">
												${taxTotal}
											</Typography>
										</Grid>
									</Grid>
								</ListItem>
								<ListItem>
									<Grid container spacing={1}>
										<Grid item md={6} xs={6}>
											<Typography>
												<strong>Total</strong>
											</Typography>
										</Grid>
										<Grid item md={6} xs={6}>
											<Typography align="right">
												<strong>
													$
													{ProductHelper.roundToPenny(
														totalPrice
													)}
												</strong>
											</Typography>
										</Grid>
									</Grid>
								</ListItem>
								{!isPaid && (
									<ListItem>
										{isPending ? (
											<CircularProgress />
										) : (
											<div className={classes.fullWidth}>
												<PayPalButtons
													createOrder={createOrder}
													onApprove={onApprove}
													onError={onError}
												></PayPalButtons>
											</div>
										)}
									</ListItem>
								)}
							</List>
						</Card>
					</Grid>
				</Grid>
			)}
		</Layout>
	) : (
		<Loading />
	);
}

/**
 * @todo can be SSR
 */
export async function getServerSideProps({ params }) {
	return { props: { params } };
}

Order.auth = true;

export default Order;
