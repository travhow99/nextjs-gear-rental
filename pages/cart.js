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
import { addItem, removeItem } from '../redux/cart/cartSlice';
import dateHelper from '../utils/dateHelper';
import ProductHelper from '../utils/helpers/ProductHelper';
import CartHelper from '../utils/helpers/CartHelper';

function Cart() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { cart } = useSelector((state) => state);
	const { cartItems } = cart;

	console.log('cart?', cartItems);

	const updateCartHandler = async (product, quantity) => {
		const { data } = await axios.get(`/api/products/${product._id}`);
		console.log(data);
		if (data.stock < quantity) {
			alert('OUT OF STOCK');
			return;
		}

		dispatch(addItem({ ...product, quantity }));
	};

	const removeCartHandler = async (product) => {
		dispatch(removeItem(product));
	};

	const checkoutHandler = () => {
		// router.push('/shipping');
		router.push('/payment');
	};

	return (
		<Layout title="Cart">
			<Typography coponent="h1" variant="h1">
				Cart
			</Typography>
			{cartItems.length === 0 ? (
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
									{cartItems.map((item, index) => (
										<TableRow key={index}>
											<TableCell>
												<NextLink
													href={`/product/${item.slug}`}
													passHref
												>
													<Link>
														<Image
															src={
																item.imageUrl ||
																item.images
																	.length
																	? item
																			.images[
																			item
																				.images
																				.length -
																				1
																	  ].path
																	: 'https://res.cloudinary.com/dwkrq4yib/image/upload/v1646708202/upload-g7c1cfd275_1280_nfmiiy.png'
															}
															alt={item.name}
															width={50}
															height={50}
														></Image>
													</Link>
												</NextLink>
											</TableCell>

											<TableCell>
												<NextLink
													href={`/product/${item.slug}`}
													passHref
												>
													<Link>
														<Typography>
															{item.title}
														</Typography>
													</Link>
												</NextLink>
											</TableCell>

											<TableCell align="right">
												<Typography>
													{dateHelper.getReadableNumberOfDaysBetween(
														new Date(item.dateOut),
														new Date(item.dateDue)
													)}
												</Typography>
											</TableCell>

											<TableCell align="right">
												<Typography>
													${item.price}
												</Typography>
											</TableCell>

											<TableCell align="right">
												<Typography>
													$
													{console.log({
														startDate: item.dateOut,
														endDate: item.dateDue,
													})}
													{ProductHelper.getProductTotalPrice(
														item.price,
														{
															startDate:
																item.dateOut,
															endDate:
																item.dateDue,
														}
													)}
												</Typography>
											</TableCell>

											<TableCell align="right">
												<Typography>
													{/* @todo format date range method */}
													{dateHelper.getHumanReadableDateRangeText(
														new Date(item.dateOut),
														new Date(item.dateDue)
													)}
												</Typography>
											</TableCell>

											<TableCell align="right">
												<Button
													variant="contained"
													color="secondary"
													onClick={(e) =>
														removeCartHandler(item)
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
