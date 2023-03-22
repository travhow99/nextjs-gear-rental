import {
	Button,
	FormControl,
	FormControlLabel,
	List,
	ListItem,
	Radio,
	RadioGroup,
	Typography,
} from '@material-ui/core';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/layout/Layout';
import { setPaymentMethod } from '../redux/cart/cartSlice';
import useStyles from '../utils/styles';

export default function Payment() {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const router = useRouter();
	const { cart } = useSelector((state) => state);
	const { paymentMethod } = cart;

	const dispatch = useDispatch();
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
	const classes = useStyles();

	useEffect(() => {
		/* if (!shippingAddress?.address) {
      router.push('/shipping');
    } else {
    } */
		console.log('pmt mthd', paymentMethod);

		if (paymentMethod) setSelectedPaymentMethod(paymentMethod);
	}, []);

	console.log('pmt', selectedPaymentMethod);
	const submitHandler = (e) => {
		closeSnackbar();
		e.preventDefault();
		if (!selectedPaymentMethod) {
			enqueueSnackbar('Please select a payment method', {
				variant: 'error',
			});
		} else {
			console.log('selected', selectedPaymentMethod, paymentMethod);
			dispatch(setPaymentMethod(selectedPaymentMethod));
			router.push('/order');
		}
	};

	return (
		<Layout title="Payment">
			<CheckoutWizard activeStep={1} />
			<form className={classes.form} onSubmit={submitHandler}>
				<Typography component="h1" variant="h1">
					Payment Method
				</Typography>
				<List>
					<ListItem>
						<FormControl component="fieldset">
							<RadioGroup
								aria-label="Payment Method"
								name="paymentMethod"
								value={selectedPaymentMethod}
								onChange={(e) =>
									setSelectedPaymentMethod(e.target.value)
								}
							>
								<FormControlLabel
									label="PayPal"
									value="PayPal"
									control={<Radio />}
								></FormControlLabel>
								<FormControlLabel
									label="Stripe"
									value="Stripe"
									control={<Radio />}
								></FormControlLabel>
							</RadioGroup>
						</FormControl>
					</ListItem>
					<ListItem>
						<Button
							fullWidth
							type="submit"
							variant="contained"
							color="primary"
						>
							Continue
						</Button>
					</ListItem>
					<ListItem>
						<Button
							fullWidth
							type="button"
							variant="contained"
							onClick={() => router.push('/shipping')}
						>
							Back
						</Button>
					</ListItem>
				</List>
			</form>
		</Layout>
	);
}
