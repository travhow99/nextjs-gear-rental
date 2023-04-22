import {
	Card,
	CircularProgress,
	Grid,
	List,
	ListItem,
	Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';

import axios from 'axios';

import { useSnackbar } from 'notistack';
import { useSession } from 'next-auth/react';

import Layout from '../../components/layout/Layout';
import useStyles from '../../utils/styles';
import {
	PayPalButtons,
	ScriptReducerAction,
	usePayPalScriptReducer,
	SCRIPT_LOADING_STATE,
} from '@paypal/react-paypal-js';
import {
	OnApproveData,
	OnApproveActions,
	UnknownObject,
	CreateOrderActions,
} from '@paypal/paypal-js/types/components/buttons';

import { getError } from '../../utils/error';
import ProductHelper from '../../utils/helpers/ProductHelper';
import Loading from '../../components/Loading';
import NotFound from '../../components/pages/NotFound';
import ItemsTable from '../../components/products/ItemsTable';
import SellerHelper from '../../utils/seller/SellerHelper';
import OrderTransactions from '../../components/orders/OrderTransactions';
import useUserOrder from '../../utils/hooks/useUserOrder';

function Order({ params }) {
	const orderId = params.id;
	const pageTitle = `Order ${orderId}`;

	const [{ isPending }, dispatch] = usePayPalScriptReducer();
	const classes = useStyles();

	const { closeSnackbar, enqueueSnackbar } = useSnackbar();
	// const dispatch = useDispatch();
	// const { paypal } = useSelector((state) => state);

	const { order, isLoading, isValidating, isError, mutate } =
		useUserOrder(orderId);

	const { status, data: session } = useSession({
		required: true,
	});

	useEffect(() => {
		if ((order && order.isPaid) || isLoading) {
		} else {
			loadPayPalScript();
		}
	}, [order]);

	const fetchOrder = async () => {
		console.log('fetch order');
		/* try {
			dispatch(orderRequest());

			const { data } = await axios.get(`/api/orders/history`);
			console.log('got data', data);

			dispatch(orderSucces(data));
		} catch (error) {
			dispatch(orderFail(error));
		} */
	};

	if (!order) {
		return (
			<NotFound title={pageTitle}>
				<Typography component={'h1'} variant={'h1'}>
					Order not found
				</Typography>
			</NotFound>
		);
	}

	console.log('O:', order);
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
	} = order;
	console.log('R', rentals);

	// const { paySuccess, payLoading, payError } = paypal;

	const taxTotal = ProductHelper.determineTax(itemsPrice, taxPrice);

	const loadPayPalScript = async () => {
		console.log('paypal');

		const { data: clientId } = await axios.get('/api/keys/paypal');

		dispatch({
			type: 'resetOptions',
			value: {
				'client-id': clientId,
				currency: 'USD',
			},
		});

		const response: ScriptReducerAction = {
			type: 'setLoadingStatus',
			value: SCRIPT_LOADING_STATE.PENDING,
		};

		dispatch(response);
	};

	const createOrder = async (
		data: UnknownObject,
		actions: CreateOrderActions
	) => {
		const orderID = await actions.order.create({
			purchase_units: [
				{
					amount: {
						value: ProductHelper.roundToPenny(totalPrice),
					},
				},
			],
		});
		return orderID;
	};

	const onApprove = async (
		_data: OnApproveData,
		actions: OnApproveActions
	) => {
		const details = await actions.order.capture();

		try {
			// dispatch(payRequest);
			const { data } = await axios.put(
				`/api/orders/${order.id}/pay`,
				details
			);

			mutate();

			await SellerHelper.storeOrderTransactionInfo(
				order.id,
				details.id,
				'purchase'
			);

			// dispatch({ type: 'PAY_SUCCESS', payload: data });
			// dispatch(paySucces);
			enqueueSnackbar('Order paid successfully!', {
				variant: 'success',
			});
		} catch (err) {
			const error = getError(err);
			// dispatch({ type: 'PAY_FAIL', payload: getError(err) });
			// dispatch(payFail(error));
			enqueueSnackbar(error, { variant: 'error' });
		}
	};

	const onError = (err: Record<string, unknown>) => {
		enqueueSnackbar(getError(err), { variant: 'error' });
	};

	return status ? (
		<Layout title={pageTitle}>
			<Typography component="h1" variant="h1">
				{pageTitle}
			</Typography>

			{/**
			 * @todo requestLoading defaulting to false from previous request
			 */}
			{isLoading ? (
				<CircularProgress />
			) : isError ? (
				<Typography className={classes.error}>{isError}</Typography>
			) : (
				<Grid container spacing={1}>
					<Grid item md={9} xs={12}>
						<Card className={classes.section}>
							<List>
								<ListItem>
									<Typography component="h2" variant="h2">
										Payment
									</Typography>
								</ListItem>
								<ListItem>{paymentMethod}</ListItem>
								<ListItem>
									<OrderTransactions
										saleId={orderId}
										transactions={order.orderTransactions}
									/>
								</ListItem>
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
										isCartPage={false}
										items={rentals.map((r) => {
											return {
												...r.sellerProduct,
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
								<ListItem>
									{order.softDelete ? (
										'Order Cancelled'
									) : !isPaid ? (
										isPending ? (
											<CircularProgress />
										) : (
											<div className={classes.fullWidth}>
												<PayPalButtons
													createOrder={createOrder}
													onApprove={onApprove}
													onError={onError}
												></PayPalButtons>
											</div>
										)
									) : null}
								</ListItem>
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

export async function getServerSideProps({ params }) {
	return { props: { params } };
}

Order.auth = true;

export default Order;
