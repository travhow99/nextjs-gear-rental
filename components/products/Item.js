import React, { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
	Grid,
	Link,
	List,
	ListItem,
	Typography,
	Card,
	Button,
	TextField,
} from '@material-ui/core';
import useStyles from '../../utils/styles';
import axios from 'axios';
import { useRouter } from 'next/router';
import { addItem } from '../../redux/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import ProductCalendar from './ProductCalendar';
import BetaProductCalendar from './BetaProductCalendar';

import { getDay } from 'date-fns';
import dateHelper from '../../utils/dateHelper';
import ProductHelper from '../../utils/helpers/ProductHelper';
import CartHelper from '../../utils/helpers/CartHelper';

export default function Item(props) {
	const router = useRouter();
	const dispatch = useDispatch();
	const { cart } = useSelector((state) => state);
	const { closeSnackbar, enqueueSnackbar } = useSnackbar();

	const [rental, setRental] = useState({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	});

	const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

	const classes = useStyles();
	const product = props.product;

	useEffect(() => {
		const disabled = buttonShouldBeDisabled();
		setButtonIsDisabled(disabled);
	}, [rental]);

	console.log('C:', cart.cartItems);

	/**
	 * @todo No need to account for existing item in cart?
	 */
	const addToCartHandler = async () => {
		const existingItem = cart.cartItems.find(
			(item) => item._id === product._id
		);

		const storeRental = {
			startDate: rental.startDate.toISOString(),
			endDate: rental.endDate.toISOString(),
		};

		console.log(cart.cartItems, {
			...product,
			rental: storeRental,
		});
		if (
			CartHelper.productCanBeAddedToCart(cart.cartItems, {
				...product,
				dateOut: storeRental.startDate,
				dateDue: storeRental.endDate,
			})
		) {
			dispatch(
				/**
				 * @todo should be able to store just product._id & generate rest serverside
				 */
				addItem({
					_id: product._id,
					product: product.product,
					slug: product.slug,
					title: product.title,
					user: product.user,
					price: product.price,
					images: [product.images[product.images.length - 1]],
					dateOut: storeRental.startDate,
					dateDue: storeRental.endDate,
				})
			);
			router.push('/cart');
		} else {
			enqueueSnackbar('Product Unavailable', {
				variant: 'error',
				autoHideDuration: 3000,
			});
		}
	};

	const booked = ProductHelper.buildCalendar(product);
	const startIsBooked = ProductHelper.getIsBooked(booked, rental.startDate);
	const endIsBooked = ProductHelper.getIsBooked(booked, rental.endDate);

	// console.log('booked?', booked, startIsBooked, endIsBooked);
	/**
	 * @todo also should ensure both dates are not in
	 */
	const buttonShouldBeDisabled = () =>
		!Boolean(rental.startDate && rental.endDate) &&
		startIsBooked &&
		endIsBooked;

	// console.log(product.rental_min, product.stock);
	console.log('new product!!', product);
	// console.log('rental date', rental, rental.startDate, rental.endDate);

	return (
		<>
			<div className={classes.section}>
				<NextLink href="/" passHref>
					<Link>
						<Typography>back to products</Typography>
					</Link>
				</NextLink>
			</div>
			<Grid container spacing={1}>
				<Grid item md={4} xs={6}>
					<Image
						src={
							product.imageUrl || product.images.length
								? product.images[product.images.length - 1].path
								: 'https://res.cloudinary.com/dwkrq4yib/image/upload/v1646708202/upload-g7c1cfd275_1280_nfmiiy.png'
						}
						alt={product.name}
						width={640}
						height={640}
						layout="responsive"
						priority={true}
					></Image>
				</Grid>
				<Grid item md={4} xs={6}>
					<List>
						<ListItem>
							<Typography component="h1" variant="h1">
								{product.title}
							</Typography>
						</ListItem>
						<ListItem>
							<Typography>
								Category: {product.category}
							</Typography>
						</ListItem>
						<ListItem>
							<Typography>Brand: {product.brand}</Typography>
						</ListItem>
						<ListItem>
							{product.reviewCount ? (
								<Typography>
									Rating: {product.rating} stars (
									{product.reviewCount} reviews)
								</Typography>
							) : (
								<Typography variant="subtitle2">
									This product has no reviews, be the first to
									leave one!
								</Typography>
							)}
						</ListItem>
						<ListItem>
							<Typography>
								{' '}
								Description: {product.description}
							</Typography>
						</ListItem>
					</List>
				</Grid>
				<Grid item md={4} xs={12}>
					<Card>
						<List>
							<ListItem>
								<Grid container>
									<Grid item md={12} xs={6}>
										<Typography>Price</Typography>
									</Grid>
									<Grid item md={12} xs={6}>
										<Typography>
											${product.price}
										</Typography>
									</Grid>
								</Grid>
							</ListItem>
							<ListItem>
								<Grid container>
									<Grid item md={12} xs={6}>
										<Typography>Status</Typography>
									</Grid>
									<Grid item md={12} xs={6}>
										<Typography>
											{product.stock > 0
												? 'In stock'
												: 'Unavailable'}
										</Typography>
									</Grid>
								</Grid>
							</ListItem>
							{rental.startDate && (
								<ListItem>
									<Typography component="p">
										{dateHelper.getReadableNumberOfDaysBetween(
											rental.endDate,
											rental.startDate
										)}
									</Typography>
								</ListItem>
							)}
							<ListItem>
								<BetaProductCalendar
									productId={product._id}
									rental={rental}
									setRange={setRental}
									range={rental}
								/>
							</ListItem>
							<ListItem>
								<Button
									disabled={buttonIsDisabled}
									fullWidth
									variant="contained"
									color="primary"
									onClick={addToCartHandler}
								>
									Add to cart
								</Button>
							</ListItem>
						</List>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}
