import {
  Button,
  Card,
  CircularProgress,
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
import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import useStyles from '../utils/styles';
import CheckoutWizard from '../components/CheckoutWizard';
import ProductHelper from '../utils/helpers/ProductHelper';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';
import Cookies from 'js-cookie';
import { signIn, useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cart/cartSlice';

function Order() {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  /*  const {
    cart: { shippingAddress, paymentMethod },
  } = state; */

  const { cart } = useSelector((state) => state);
  const { cartItems } = cart;

  console.log('cart?', cartItems);

  const subtotal = ProductHelper.determineSubtotal(cartItems);
  const taxPrice = 0.075;
  const taxTotal = ProductHelper.determineTax(subtotal, taxPrice);
  const totalPrice = ProductHelper.determineTotal(subtotal, taxTotal);

  const placeOrderHandler = async () => {
    closeSnackbar();

    console.log('sesh', session.user.email);

    try {
      setLoading(true);

      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        itemsPrice: subtotal,
        // shippingAddress,
        // paymentMethod,
        taxPrice,
        totalPrice,
        email: session.user.email,
      });

      // dispatch({ type: 'CART_CLEAR' });
      dispatch(clearCart);
      Cookies.remove('cartItems');
      setLoading(false);

      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      const errorString = getError(err);
      enqueueSnackbar(errorString, { variant: 'error' });
    }
  };

  useEffect(() => {
    /* if (!paymentMethod) {
      router.push('/payment');
    } */
    if (!cartItems.length) {
      router.push('/cart');
    }
  }, []);

  return (
    <Layout title="Cart">
      <CheckoutWizard activeStep={3} />
      <Typography coponent="h1" variant="h1">
        Order
      </Typography>

      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Shipping Address
                </Typography>
              </ListItem>
              {/* <ListItem>
                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </ListItem> */}
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Payment Method
                </Typography>
              </ListItem>
              {/* <ListItem>{paymentMethod}</ListItem> */}
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
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  src={
                                    item.imageUrl || item.images.length
                                      ? item.images[item.images.length - 1].path
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
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Typography>{item.title}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>

                          <TableCell align="right">
                            <Typography>{item.quantity}</Typography>
                          </TableCell>

                          <TableCell align="right">${item.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography variant="h2">Order Summary</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item md={6} xs={6}>
                    <Typography>Subtotal</Typography>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <Typography align="right">${subtotal}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item md={6} xs={6}>
                    <Typography>Tax</Typography>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <Typography align="right">${taxTotal}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item md={6} xs={6}>
                    <Typography>
                      <strong>Total</strong>
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <Typography align="right">
                      <strong>${totalPrice}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  onClick={placeOrderHandler}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {loading ? (
                    <ListItem>
                      <CircularProgress />
                    </ListItem>
                  ) : (
                    'Place Order'
                  )}
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
