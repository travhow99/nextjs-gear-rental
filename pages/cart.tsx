import {
	Button,
	Card,
	Grid,
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
import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import dateHelper from '../utils/dateHelper';
import ProductHelper from '../utils/helpers/ProductHelper';
import useCart from '../utils/hooks/useCart';
import CartItem from '../types/CartItem';
import addDays from 'date-fns/addDays';
import CartHelper from '../utils/helpers/CartHelper';
import { removeItemFromCart } from '../utils/helpers/api/CartHelper';

function Cart() {
	const router = useRouter();

	const { cart, isLoading, mutate } = useCart();

	const { cartItems } = cart || { cartItems: [] };

	console.log('cart?', cartItems);
	const today = new Date();
	const tomorrow = addDays(today, 1);

	const removeCartHandler = async (productId: CartItem['id']) => {
		// dispatch(removeItem(product));

		try {
			await removeItemFromCart(productId);

			mutate();
		} catch (error) {}
	};

	const checkoutHandler = () => {
		// router.push('/shipping');
		router.push('/payment');
	};

	return (
		<Layout title="Cart">
			<Typography component="h1" variant="h1">
				Cart
			</Typography>
			{isLoading || cartItems.length === 0 ? (
				<div>
					Cart is empty.{' '}
					<NextLink href="/" passHref>
						<Link>Keep Shopping</Link>
					</NextLink>
				</div>
			) : (
				<Grid container spacing={1}>
					<Grid item md={9} xs={12}>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell></TableCell>
										<TableCell>Item</TableCell>
										<TableCell align="right">
											Days
										</TableCell>
										<TableCell align="right">
											Price / day
										</TableCell>
										<TableCell align="right">
											Total Price
										</TableCell>
										<TableCell align="right">
											Dates
										</TableCell>
										<TableCell align="right">
											{/* Action */}
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{cartItems.map((cartItem, index) => (
										<TableRow key={index}>
											<TableCell>
												<NextLink
													href={`/product/${cartItem.product.slug}`}
													passHref
												>
													<Link>
														<Image
															src={
																cartItem.product
																	.imageUrl ||
																cartItem.product
																	.images
																	?.length
																	? cartItem
																			.product
																			.images[
																			cartItem
																				.product
																				.images
																				.length -
																				1
																	  ]?.path ||
																	  'https://res.cloudinary.com/dwkrq4yib/image/upload/v1646708202/upload-g7c1cfd275_1280_nfmiiy.png'
																	: 'https://res.cloudinary.com/dwkrq4yib/image/upload/v1646708202/upload-g7c1cfd275_1280_nfmiiy.png'
															}
															alt={
																cartItem.product
																	.title
															}
															width={50}
															height={50}
														></Image>
													</Link>
												</NextLink>
											</TableCell>

											<TableCell>
												<NextLink
													href={`/product/${cartItem.product.slug}`}
													passHref
												>
													<Link>
														<Typography>
															{
																cartItem.product
																	.title
															}
														</Typography>
													</Link>
												</NextLink>
											</TableCell>

											<TableCell align="right">
												<Typography>
													{dateHelper.getReadableNumberOfDaysBetween(
														new Date(
															cartItem.startDate
														),
														new Date(
															cartItem.endDate
														)
													)}
												</Typography>
											</TableCell>

											<TableCell align="right">
												<Typography>
													${cartItem.product.price}
												</Typography>
											</TableCell>

											<TableCell align="right">
												<Typography>
													$
													{ProductHelper.getProductTotalPrice(
														cartItem.product.price,
														{
															startDate:
																cartItem.startDate,
															endDate:
																cartItem.endDate,
														}
													)}
												</Typography>
											</TableCell>

											<TableCell align="right">
												<Typography>
													{/* @todo format date range method */}
													{dateHelper.getHumanReadableDateRangeText(
														new Date(
															cartItem.startDate
														),
														new Date(
															cartItem.endDate
														)
													)}
												</Typography>
											</TableCell>

											<TableCell align="right">
												<Button
													variant="contained"
													color="secondary"
													onClick={(e) =>
														removeCartHandler(
															cartItem.id
														)
													}
												>
													x
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item md={3} xs={12}>
						<Card>
							<List>
								<ListItem>
									<Typography variant="h2">
										Subtotal ({cartItems.length} items) : ${' '}
										{CartHelper.getCartTotalPrice(
											cartItems
										)}
									</Typography>
								</ListItem>
								<ListItem>
									<Button
										onClick={checkoutHandler}
										variant="contained"
										color="primary"
										fullWidth
									>
										Check Out
									</Button>
								</ListItem>
							</List>
						</Card>
					</Grid>
				</Grid>
			)}
		</Layout>
	);
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
