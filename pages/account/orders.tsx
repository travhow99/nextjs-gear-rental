import {
	Button,
	Card,
	Chip,
	CircularProgress,
	Grid,
	LinearProgress,
	Link,
	List,
	ListItem,
	MenuItem,
	Select,
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
import React, { useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import useStyles from '../../utils/styles';
import ProductHelper from '../../utils/helpers/ProductHelper';
import { Stack } from '@mui/material';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import {
	orderRequest,
	orderSucces,
	orderFail,
} from '../../redux/orders/ordersSlice';
import ProfileContainer from '../../components/account/ProfileContainer';
import useUserOrders from '../../utils/hooks/useUserOrders';
function Orders() {
	const { orders, isLoading, isError } = useUserOrders();

	if (orders) console.log('got orders', orders);

	const { data: session, status } = useSession({
		required: true,
	});

	return (
		<ProfileContainer title={'Orders'}>
			{status ? (
				<>
					<Typography component="h1" variant="h1">
						Orders
					</Typography>
					{isLoading /* || !orders.orders.length */ ? (
						<Loading />
					) : orders.length === 0 ? (
						<div>
							You have no orders yet...
							<br />
							<br />
							<NextLink href="/" passHref>
								<Link>Start Shopping!</Link>
							</NextLink>
						</div>
					) : (
						<Grid container spacing={1}>
							<Grid item md={12} xs={12}>
								<TableContainer>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>
													Order Placed
												</TableCell>
												<TableCell>Total</TableCell>
												<TableCell>Paid</TableCell>
												<TableCell>Order #</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{orders
												.slice(0)
												.reverse()
												.map((order) => (
													<TableRow key={order.id}>
														<TableCell>
															{ProductHelper.formatPurchaseDate(
																order.createdAt
															)}
														</TableCell>
														<TableCell>
															$
															{ProductHelper.roundToPenny(
																order.totalPrice
															)}
														</TableCell>
														<TableCell>
															{order.paidAt ? (
																<Stack>
																	<Chip
																		label={ProductHelper.formatPurchaseDate(
																			order.paidAt
																		)}
																		color="primary"
																		variant="outlined"
																	/>
																</Stack>
															) : (
																<Stack>
																	<Chip
																		label="Unpaid"
																		color="default"
																		// variant="outlined"
																	/>
																</Stack>
															)}
														</TableCell>

														<TableCell>
															<NextLink
																href={`/order/${order.id}`}
																passHref
															>
																<Link>
																	<Typography>
																		{
																			order.id
																		}
																	</Typography>
																</Link>
															</NextLink>
														</TableCell>
													</TableRow>
												))}
										</TableBody>
									</Table>
								</TableContainer>
							</Grid>
						</Grid>
					)}
				</>
			) : (
				<Loading />
			)}
		</ProfileContainer>
	);
}

Orders.auth = true;

export default Orders; // dynamic(() => Promise.resolve(Orders), { ssr: false });
